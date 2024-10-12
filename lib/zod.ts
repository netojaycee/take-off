import { z } from "zod";


export const editProfileSchema = z
    .object({
        name: z
            .string({ required_error: "name is required" })
            .min(1, "Name is required"),
        email: z
            .string({ required_error: "Email is required" })
            .email("Invalid email address"),
        contact: z
            .string({ required_error: "contact phone is required" })
            .min(1, "Name is required"),
        address: z
            .string({ required_error: "address is required" })
            .min(1, "address is required"),
        image: z
            .string({ required_error: "image is required" })
            .min(1, "image is required"),
    });


export const editItemSchema = z
    .object({
        name: z
            .string({ required_error: "name is required" })
            .min(1, "Name is required"),
        category: z
            .string({ required_error: "category is required" })
            .min(1, "category is required"),
        price: z
            .number({ required_error: "price is required" })
            .min(1, "price is required"),
        description: z
            .string({ required_error: "Description is required" })
            .min(1, "Description is required"),
        stock: z
            .number({ required_error: "Stock is required" })
            .min(1, "Stock is required"),
        images: z.array(z.string()).min(4, 'Product must have 4 images'),

    });