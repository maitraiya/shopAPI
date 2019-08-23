let server;
const request = require('supertest');
const {Phone} = require('../../models/Phone');
const {User} = require('../../models/User');

describe('/api/phones',()=>{
    beforeEach(()=>{server = require('../../index')});
    afterEach(async()=>{
        server.close();
        await Phone.remove({});   
    });
    describe('get/ ',()=>{
        it('should return all phones',async ()=>{
            Phone.collection.insertOne([
                {
                    company: "One-Plus",
                    model: "OnePlus-5T",
                    screen_size: "6" ,
                    price:"40000",
                    camera_specifications:"15 megapixel",
                    ram: "6",
                    isDiscountAvailable: "true",
                    imageUrl:"Some_URLaaa"
                }
            ]);
            const res = await request(server).get('/api/phones')
            expect(res.status).toBe(200);            
        });
        it('should save and return phone',async()=>{
            Phone.collection.insertOne([
                {
                    company: "One-Plus",
                    model: "OnePlus-5T",
                    screen_size: "6" ,
                    price:"40000",
                    camera_specifications:"15 megapixel",
                    ram: "6",
                    isDiscountAvailable: "true",
                    imageUrl:"Some_URLaaa"
                }
            ]);
            const res = await request(server).get('/api/phones');
            expect(res.body.length).toBe(1);         
        });
        it('should return 404',async ()=>{
            await Phone.remove({});
            const res = await request(server).get('/api/phones')
            expect(res.status).toBe(404);            
        });
    });
    describe('get/id',()=>{
        it('should return phone with id',async ()=>{
            const phone = new Phone({
                company: "One-Plus",
                model: "OnePlus-5T",
                screen_size: "6" ,
                price:"40000",
                camera_specifications:"15 megapixel",
                ram: "6",
                isDiscountAvailable: "true",
                imageUrl:"Some_URLaaa"
            });
            await phone.save();
            const res = await request(server).get('/api/phones/'+phone._id);
            expect(res.status).toBe(200);
        });
        it('should return phone status with 404',async ()=>{
            const res = await request(server).get('/api/phones/4');
            expect(res.status).toBe(404);
        });        
    });
    describe('post/ ',()=>{
        it('should return 401 if user not logged in ',async ()=>{
            const res = await request(server).post('/api/phones').send({
                company: "One-Plus",
                model: "OnePlus-5T",
                screen_size: "6" ,
                price:"40000",
                camera_specifications:"15 megapixel",
                ram: "6",
                isDiscountAvailable: "true",
                imageUrl:"Some_URLaaa"
            });
            expect(res.status).toBe(401);
        }); 
        it('should return 403 if user is not a admin',async ()=>{
            const token = new User().generateAuthToken();
            const res = await request(server).post('/api/phones').send({
                company: "One-Plus",
                model: "OnePlus-5T",
                screen_size: "6" ,
                price:"40000",
                camera_specifications:"15 megapixel",
                ram: "6",
                isDiscountAvailable: "true",
                imageUrl:"Some_URLaaa"
            }).set('shop-auth-token',token);
            expect(res.status).toBe(403);
        });
        it('should return 400 if phone is Invalid',async ()=>{
            const usertemp ={isAdmin:true}
            const token = new User(usertemp).generateAuthToken();
            const res = await request(server).post('/api/phones').send({
                company: "One-Plus",
                model: "OnePlus-5T",
            }).set('shop-auth-token',token);
            expect(res.status).toBe(400);

        });
        it('should return 200 if phone is valid',async ()=>{
            const usertemp ={isAdmin:true}
            const token = new User(usertemp).generateAuthToken();
            const res = await request(server).post('/api/phones').send({
                company: "One-Plus",
                model: "OnePlus-5T",
                screen_size: "6" ,
                price:"40000",
                camera_specifications:"15 megapixel",
                ram: "6",
                isDiscountAvailable: "true",
                imageUrl:"Some_URLaaa"
            }).set('shop-auth-token',token);
            expect(res.status).toBe(200);
            
        });
    });
    describe('delete/id',()=>{
        it('should return phone status with 404',async ()=>{
            const token = new User().generateAuthToken();
            const phone = new Phone({
                company: "One-Plus",
                model: "OnePlus-5T",
                screen_size: "6" ,
                price:"40000",
                camera_specifications:"15 megapixel",
                ram: "6",
                isDiscountAvailable: "true",
                imageUrl:"Some_URLaaa"
            });
            await phone.save();
            const res = await request(server).delete('/api/phones/'+phone._id).set('shop-auth-token',token);
            expect(res.status).toBe(403);
        });
        it('should return phone status with 401',async ()=>{
            const token = 'abcd'
            const phone = new Phone({
                company: "One-Plus",
                model: "OnePlus-5T",
                screen_size: "6" ,
                price:"40000",
                camera_specifications:"15 megapixel",
                ram: "6",
                isDiscountAvailable: "true",
                imageUrl:"Some_URLaaa"
            });
            await phone.save();
            const res = await request(server).delete('/api/phones/'+phone._id).set('shop-auth-token',token);
            expect(res.status).toBe(401);
        });
        it('should return phone status with 200',async ()=>{
            const usertemp = new User({isSuperAdmin:true});
            const token = new User(usertemp).generateAuthToken();
            const phone = new Phone({
                company: "One-Plus",
                model: "OnePlus-5T",
                screen_size: "6" ,
                price:"40000",
                camera_specifications:"15 megapixel",
                ram: "6",
                isDiscountAvailable: "true",
                imageUrl:"Some_URLaaa"
            });
            await phone.save();
            const res = await request(server).delete('/api/phones/'+phone._id).set('shop-auth-token',token);
            expect(res.status).toBe(200);
        });
    });
});
