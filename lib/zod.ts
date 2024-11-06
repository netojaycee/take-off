import { z } from "zod";


export const registerSchema = z
    .object({
        name: z
            .string({ required_error: "name is required" })
            .min(1, "Name is required"),
        role: z
            .string({ required_error: "role is required" })
            .min(1, "Role is required"),
        email: z
            .string({ required_error: "Email is required" })
            .email("Invalid email address"),
        password: z
            .string({ required_error: "Password is required" })
            .min(6, "Password must be at least 6 characters long"),
        confirmPassword: z
            .string({
                required_error: "Confirm Password is required",
            })
            .min(6, "Confirm password must be at least 6 characters long"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });



export const becomeSellerSchema = z
    .object({
        // name: z
        //   .string()
        //   .min(1, "Name is required")
        //   .optional(),
        // role: z
        //   .string()
        //   .min(1, "Role is required")
        //   .optional(),
        email: z
            .string({ required_error: "Email is required" })
            .email("Invalid email address"),
        // password: z
        //   .string()
        //   .min(6, "Password must be at least 6 characters long")
        //   .optional(),
        // confirmPassword: z
        //   .string()
        //   .min(6, "Confirm password must be at least 6 characters long")
        //   .optional(),
    })
//   .refine(
//     (data) => !data.password || data.password === data.confirmPassword,
//     {
//       message: "Passwords don't match",
//       path: ["confirmPassword"],
//     }
//   );


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

export const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email address"),
    password: z
        .string({ required_error: "Password is required" })
        .min(6, "Password must be at least 6 characters long"),
});


export const createCategorySchema = z
    .object({
        name: z
            .string({ required_error: "category name is required" })
            .min(1, "Category Name is required"),
        image: z
            .string({ required_error: "image is required" })
            .min(1, "image is required"),
    });