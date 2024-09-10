export interface CPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }

export interface NCardProps {
    ncard: {
        id: number;
        title: string;
        description: string;
        likes: number;
        comments: number;
        writer: string;
        rate: string;
        type_1: string;
        type_2: string;
        cover: string
    };
  }

  export interface NCardPropsv {
    ncardv: {
        id: number;
        title: string;
        description: string;
        likes: number;
        comments: number;
        writer: string;
        rate: string;
        type_1: string;
        type_2: string;
        cover: string
    };
  }

export const sampleNovelData = {
    title: 'The Enchanted Forest',
    content: `
      In a faraway kingdom, beyond the rolling hills and deep blue rivers, lay an enchanted forest unlike any other. The trees were ancient, their branches twisted into the sky, and the leaves glowed with a faint, magical light...
  
      [Insert the rest of the story here]
    `,
    likes: 897,
    comments: 42,
    author: 'Luna Rivers',
  };