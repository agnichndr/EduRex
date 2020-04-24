export class GpSubject
{
    subject_id : String
    classes_is :  String[]
}

export class Group
{
    group_id : String
    group_name : String
    active : boolean
    subject : GpSubject[]
}