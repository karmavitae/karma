export interface IArticle {
    title:string
    img:string,
    quote:string,
    content:IArticleContent[]
}

export interface IArticleContent {
    type: number  //1 subhead, 2 bullets, 3 text
    text?: string
    list?: string[]
}

export interface IArticles {
    [key:string]:IArticle
}