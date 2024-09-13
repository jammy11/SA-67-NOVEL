export interface InterfaceNovelOfWriter { 
    ID: number;
    novel_name: string; // เปลี่ยนจาก Name
    Cover: string;
    Description?: string;
    WriterName: string;
    Visibility?: boolean;
    BuyAmount: number;
    Like: number;
    Rate?: string;
    Type?: string;
}
