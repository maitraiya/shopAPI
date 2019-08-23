const {validateUser} = require('../../models/User');

describe('validate',() =>{
    const user = {
        name:'Test1',
        email:'Test@test.com',
        password:'Test1Password'
    }
    it("should return name "+user.company, ()=>{
        const result = validateUser(user);
        expect(result).toMatchObject({value:{name:"Test1"}});  
    })       
    it("should return error if email not in format", ()=>{
        user.email='assd.com';
        const result = validateUser(user);
        expect(result).not.toEqual({error:null})
        user.email='Test@test.com'
    });
});

