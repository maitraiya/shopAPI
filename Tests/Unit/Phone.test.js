const {validatePhone} = require('../../models/Phone');

describe('validate',() =>{
    const phone = {
            company: "One-Plus",
            model: "OnePlus-5T",
            screen_size: "6" ,
            price:"40000",
            camera_specifications:"15 megapixel",
            ram: "6",
            isDiscountAvailable: "true",
            imageUrl:"Some_URLaaa"
    }
    it("should return Company value as "+phone.company, ()=>{
        const result = validatePhone(phone);
        expect(result).toMatchObject({value:{company:"One-Plus"}});  
    })       
    it("should return error if price is set in string ", ()=>{
        phone.price='asda'
        const result = validatePhone(phone);
        expect(result).not.toEqual({error:null})
        phone.price=40000
    });
    it("should return error if imageURL Length is less than 10 ", ()=>{
        phone.imageUrl='aaa';
        const result = validatePhone(phone);
        expect(result).not.toEqual({error:null})
        phone.imageUrl='some_image_url';
    });

});

