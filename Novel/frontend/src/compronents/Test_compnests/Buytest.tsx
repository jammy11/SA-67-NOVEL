import React, { useEffect, useState } from "react";
import { GetNovels } from "../../services/https/Novel/novel"; 
import { CreateTransaction } from "../../services/https/Transaction/transaction"; 

interface Writer {
    ID: number;
    Income: number;
    UserID: number;
    User: {
        ID: number;
        user_name: string;
        email: string;
    };
}

interface Novel {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    novel_name: string;
    content: string;
    novel_type: string;
    rate: string;
    cover: string;
    novel_price: number;
    novel_like: number;
    buy_amont: number;
    Bookshelf: any; // Adjust based on actual structure
    writer_id: number;
    writer: Writer;
}

const NovelList: React.FC = () => {
    const [novels, setNovels] = useState<Novel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const userIdstr = localStorage.getItem("id");
    const userId = Number(userIdstr || 0);

    useEffect(() => {
        const fetchNovels = async () => {
            try {
                const response = await GetNovels();
                console.log('API response:', response);

                // Extract the novel data from the response
                const novelData = response.novel;
                
                if (novelData) {
                    setNovels([novelData]); // Wrap the single object in an array
                } else {
                    console.error('No novel data found:', response);
                    setError('Data format error.');
                }
            } catch (error) {
                console.error('Failed to fetch novels:', error);
                setError('Failed to fetch novels.');
            } finally {
                setLoading(false);
            }
        };

        fetchNovels();
    }, []);

    useEffect(() => {
        const createTransaction = async () => {
            try {
                await CreateTransaction({
                    trans_type: "ซื้อนิยาย", 
                    user_id: userId,     
                    order_id: 1             
                });
            } catch (error) {
                console.error('Failed to create transaction:', error);
            }
        };

        createTransaction();
    }, [userId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Novels</h1>
            <ul>
                {novels.map((novel) => (
                    <li key={novel.ID}>
                        <h2>{novel.novel_name}</h2>
                        <p>{novel.content}</p>
                        <p>Type: {novel.novel_type}</p>
                        <p>Rate: {novel.rate}</p>
                        <p>Price: ${novel.novel_price.toFixed(2)}</p>
                        <p>Likes: {novel.novel_like}</p>
                        <p>Buy Amount: {novel.buy_amont}</p>
                        {novel.writer && (
                            <div>
                                <h3>Writer</h3>
                                <p>Writer ID: {novel.writer.ID}</p>
                                <p>Income: ${novel.writer.Income.toFixed(2)}</p>
                                <p>User ID: {novel.writer.UserID}</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NovelList;
