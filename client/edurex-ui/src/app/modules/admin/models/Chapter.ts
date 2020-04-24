export class Chapter
{
    _id?: string;
    chapter_id : string;
    chapter_name : string;
    chapter_description : string;
    chapter_subject : string;
    chapter_class : string;
    chapter_referrence_book : Array<string>;
    image_source : string;
    active : boolean;
}