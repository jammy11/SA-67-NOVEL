import React from 'react';
import './writerEditNovel.css'; 
import WriterEditComponent from '../WriterSection/WrtiterEditComponent';
import SaveButton from '../SaveButton/saveButtonNovel';
import NovelEditor from '../NovelEditor/NovelEditor';

const WriterEditNovel: React.FC = () => {
    return (
        <>
        <div className="xxx">
            <div className='writerEditComponent'>
                <WriterEditComponent/>
            </div>

            <div className="novelEditorContainer">
                <NovelEditor / >
            </div>
            <div className='container-save-button'><SaveButton /></div>
            </div >
        </>
    );
};

export default WriterEditNovel;