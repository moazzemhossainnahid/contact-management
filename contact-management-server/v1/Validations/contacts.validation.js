const { z } = require('zod');

const contactSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    phone: z.string().min(8).max(15),
    address: z.string().min(5).max(100),
    profilePicture: z.string().url()
});


module.exports = contactSchema;
