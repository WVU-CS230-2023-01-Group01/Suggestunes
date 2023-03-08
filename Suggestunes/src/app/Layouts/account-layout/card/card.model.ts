export class CardModel {
    imgDescription: string;
    description: string;
    img: string;
    constructor(imgDescription: string, description: string, img: string, x: number){
        this.img =img;
        this.imgDescription = imgDescription;
        this.description=description;
    }
}