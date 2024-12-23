import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { clearCredentials, setCredentials } from "./slices/authSlice";

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:5000/api/",
  baseUrl: "https://take-off-r3fp.onrender.com/",
  prepareHeaders: (headers) => {
    const token = Cookies.get("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
  // Custom response handler to handle text responses
  async responseHandler(response) {
    const text = await response.text();
    try {
      const jsonResponse = JSON.parse(text);

      if (jsonResponse && jsonResponse.message === "Token has expired") {
        Cookies.remove("token");
        window.location.href = "/signin";
      }

      return jsonResponse;
    } catch {
      return text; // If JSON parsing fails, return the raw text
    }
  },
});

export const productsApi = createApi({
  reducerPath: "products",
  baseQuery,
  tagTypes: ["Category", "Product"],

  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/create",
        method: "POST",
        body: credentials,
        headers: { "Content-Type": "application/json" },
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          //   console.error("Register failed:", err);
        }
      },
    }),

    verifyToken: builder.mutation({
      query: (credentials) => ({
        url: "/auth/verify-token",
        method: "POST",
        body: credentials,
        headers: { "Content-Type": "application/json" },
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          //   console.error("Register failed:", err);
        }
      },
    }),

    resendVerifyToken: builder.mutation({
      query: (credentials) => ({
        url: "/auth/resend-token",
        method: "POST",
        body: credentials,
        headers: { "Content-Type": "application/json" },
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          //   console.error("Register failed:", err);
        }
      },
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        headers: { "Content-Type": "application/json" },
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        // const { setAuthSession } = useSession();
        try {
          const result = await queryFulfilled;
          const decodedToken = jwtDecode(result.data.token);
          console.log(decodedToken);

          // Set credentials in Redux
          dispatch(
            setCredentials({ token: result.data.token, userData: decodedToken })
          );

          // Set the cookie
          // Cookies.set("token", result.data.token);
          Cookies.set("token", result.data.token, {
            expires: 7,
            secure: true,
            sameSite: "strict",
          });
          // const token = result.data.token;
          // setAuthSession(token);
        } catch (err) {
          //   console.error("Register failed:", err);
        }
      },
    }),

    becomeSeller: builder.mutation({
      query: (credentials) => ({
        url: "/seller/become-seller",
        method: "POST",
        body: credentials,
        headers: { "Content-Type": "application/json" },
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          //   console.error("Register failed:", err);
        }
      },
    }),

    addCategory: builder.mutation({
      query: (formData) => ({
        url: "/category/create",
        method: "POST",
        body: formData,
      }),

      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          // console.log("registered");
          await queryFulfilled;
        } catch (err) {
          // console.error("category add failed:", err);
        }
      },
      invalidatesTags: ["Category"],
    }),
    getAllCategory: builder.query({
      query: () => "/category/all",
      providesTags: ["Category"],
      headers: { "Content-Type": "application/json" },
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
        // body: formData,
      }),

      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          // console.log("registered");
          await queryFulfilled;
        } catch (err) {
          // console.error("category delete failed:", err);
        }
      },
      invalidatesTags: ["Category"],
    }),

    getCategoryById: builder.query({
      query: (id) => ({
        url: `/category/${id}`,
        method: "GET",
      }),
    }),

    editCategory: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/category/${id}`,
        method: "PATCH",
        body: formData,
      }),

      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          // console.log("registered");
          await queryFulfilled;
        } catch (err) {
          // console.error("category edit failed:", err);
        }
      },
      invalidatesTags: ["Category"],
    }),

    addProduct: builder.mutation({
      query: (formData) => ({
        url: "/product/create",
        method: "POST",
        body: formData,
      }),

      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          // console.log("registered");
          await queryFulfilled;
        } catch (err) {
          // console.error("product add failed:", err);
        }
      },
      invalidatesTags: ["Product"],
    }),

    editProduct: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/product/update/${id}`,
        method: "PATCH",
        body: formData,
      }),

      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          // console.log("registered");
          await queryFulfilled;
        } catch (err) {
          // console.error("product add failed:", err);
        }
      },
      invalidatesTags: ["Product"],
    }),
    getAllProduct: builder.query({
      query: () => "/product/all",
      providesTags: ["Product"],
      headers: { "Content-Type": "application/json" },
    }),
    getAllProductFeatured: builder.query({
      query: () => "/product/featured",
      // providesTags: ["Product"],
      headers: { "Content-Type": "application/json" },
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
        // body: formData,
      }),

      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          // console.log("registered");
          await queryFulfilled;
        } catch (err) {
          // console.error("category delete failed:", err);
        }
      },
      invalidatesTags: ["Product"],
    }),

    getProductById: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
    }),
    getGoogleSignin: builder.query({
      query: () => "/google",
      // headers: { "Content-Type": "application/json" },
    }),
    // getAllProduct: builder.query({
    //   query: () => "/products",
    //   providesTags: ["Product"],
    // }),
    // getAllCategory: builder.query({
    //   query: () => "/categories",
    //   providesTags: ["Category"],
    // }),
    // getAllUserOrders: builder.query({
    //   query: (id) => `/my-orders/${id}`,
    //   providesTags: ["UserOrders"],
    // }),
    // getAllOrders: builder.query({
    //   query: () => `/orders/`,
    //   providesTags: ["AdminOrders"],
    // }),
    // getAllUsers: builder.query({
    //   query: () => `/users/`,
    // }),

    // editCategory: builder.mutation({
    //   query: ({ slug, credentials }) => ({
    //     url: `categories/${slug}`,
    //     method: "PUT",
    //     body: credentials,
    //   }),

    //   onQueryStarted: async (arg, { queryFulfilled }) => {
    //     try {
    //       // console.log("registered");
    //       await queryFulfilled;
    //     } catch (err) {
    //       // console.error("category add failed:", err);
    //     }
    //   },
    //   invalidatesTags: ["Category"],
    // }),
    // addProduct: builder.mutation({
    //   query: (credentials) => ({
    //     url: "/products",
    //     method: "POST",
    //     body: credentials,
    //   }),

    //   onQueryStarted: async (arg, { queryFulfilled }) => {
    //     try {
    //       // console.log("registered");
    //       await queryFulfilled;
    //     } catch (err) {
    //       // console.error("product add failed:", err);
    //     }
    //   },
    //   invalidatesTags: ["Product"],
    // }),
    // editProduct: builder.mutation({
    //   query: ({ slug, credentials }) => ({
    //     url: `products/${slug}`,
    //     method: "PATCH",
    //     body: credentials,
    //   }),

    //   onQueryStarted: async (arg, { queryFulfilled }) => {
    //     try {
    //       // console.log("registered");
    //       await queryFulfilled;
    //     } catch (err) {
    //       // console.error("product edit failed:", err);
    //     }
    //   },
    //   invalidatesTags: ["Product"],
    // }),
    // markOrder: builder.mutation({
    //   query: ({ credentials, id }) => ({
    //     url: `orders/${id}`,
    //     method: "PATCH",
    //     body: credentials,
    //   }),
    //   onQueryStarted: async (arg, { queryFulfilled }) => {
    //     try {
    //       await queryFulfilled;
    //     } catch (err) {
    //       // console.error("failed to update order status:", err);
    //     }
    //   },
    //   invalidatesTags: ["UserOrders", "AdminOrders"],
    // }),
    // payment: builder.mutation({
    //   query: (credentials) => ({
    //     url: `paystack/pay`,
    //     method: "POST",
    //     body: credentials,
    //   }),
    //   onQueryStarted: async (arg, { queryFulfilled }) => {
    //     try {
    //       await queryFulfilled;
    //     } catch (err) {
    //       // console.error("failed to pay for service:", err);
    //     }
    //   },
    // }),
    // getVerifyPayment: builder.query({
    //   query: (reference) => `paystack/verify/${reference}`,
    // }),

    // forgotPass: builder.mutation({
    //   query: (credentials) => ({
    //     url: "/forgot-password",
    //     method: "POST",
    //     body: credentials,
    //   }),
    //   onQueryStarted: async (arg, { queryFulfilled }) => {
    //     try {
    //       await queryFulfilled;
    //     } catch (err) {
    //       // console.error("Reset Link send  failed:", err);
    //     }
    //   },
    // }),

    // resetPass: builder.mutation({
    //   query: ({ credentials, token }) => ({
    //     url: `/reset-password/${token}`,
    //     method: "POST",
    //     body: credentials,
    //   }),
    //   onQueryStarted: async (arg, { queryFulfilled }) => {
    //     try {
    //       await queryFulfilled;
    //     } catch (err) {
    //       // console.error("Reset Link send  failed:", err);
    //     }
    //   },
    // }),
    // editUser: builder.mutation({
    //   query: ({ credentials, id }) => ({
    //     url: `/users/${id}`,
    //     method: "PATCH",
    //     body: credentials,
    //   }),
    //   onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
    //     try {
    //       const response = await queryFulfilled;
    //       const token = response.data.token; // Assuming the response data is the JWT
    //       // console.log(response.data.token)
    //       // const decodedToken = jwtDecode(token);

    //       // // Extract required fields from the decoded token
    //       // const { name, email, isAdmin, _id, phoneNumber, address } =
    //       //   decodedToken;

    //       // Dispatch actions with decoded data
    //       dispatch(setCredentials({ token }));
    //       // dispatch(
    //       //   setUserInfo({
    //       //     name,
    //       //     email,
    //       //     isAdmin,
    //       //     _id,
    //       //     address,
    //       //     phoneNumber,
    //       //   })
    //       // );
    //     } catch (err) {
    //       // console.error("update failed:", err);
    //     }
    //   },
    // }),
    // editUserPassword: builder.mutation({
    //   query: ({ credentials, id }) => ({
    //     url: `/users/${id}/password`,
    //     method: "PATCH",
    //     body: credentials,
    //   }),
    //   onQueryStarted: async (arg, { queryFulfilled }) => {
    //     try {
    //       await queryFulfilled;
    //     } catch (err) {
    //       // console.error("update password  failed:", err);
    //     }
    //   },
    // }),
    // contact: builder.mutation({
    //   query: (credentials) => ({
    //     url: `/contact`,
    //     method: "POST",
    //     body: credentials,
    //   }),
    //   onQueryStarted: async (arg, { queryFulfilled }) => {
    //     try {
    //       await queryFulfilled;
    //     } catch (err) {
    //       // console.error("Reset Link send  failed:", err);
    //     }
    //   },
    // }),
    // login: builder.mutation({
    //   query: (credentials) => ({
    //     url: "/login",
    //     method: "POST",
    //     body: credentials,
    //   }),
    //   onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
    //     try {
    //       const response = await queryFulfilled;
    //       const token = response.data; // Assuming the response data is the JWT

    //       const decodedToken = jwtDecode(token);

    //       // Extract required fields from the decoded token
    //       const { name, email, isAdmin, _id, phoneNumber, address } =
    //         decodedToken;

    //       // Dispatch actions with decoded data
    //       dispatch(setCredentials({ token }));
    //       dispatch(
    //         setUserInfo({
    //           name,
    //           email,
    //           isAdmin,
    //           _id,
    //           address,
    //           phoneNumber,
    //         })
    //       );

    //       // console.log("Login successful:");
    //     } catch (err) {
    //       // console.error("Login failed:", err);
    //     }
    //   },
    // }),

    // deleteCategory: builder.mutation({
    //   query: (credentials) => ({
    //     url: `categories/${credentials}`,
    //     method: "DELETE",
    //     // body: credentials,
    //   }),
    //   onQueryStarted: async (arg, { queryFulfilled }) => {
    //     try {
    //       await queryFulfilled;
    //     } catch (err) {
    //       // console.error("fetch failed:", err);
    //     }
    //   },
    //   invalidatesTags: ["Category"],
    // }),
    // deleteOrders: builder.mutation({
    //   query: (id) => ({
    //     url: `orders/${id}`,
    //     method: "DELETE",
    //     // body: credentials,
    //   }),
    //   onQueryStarted: async (arg, { queryFulfilled }) => {
    //     try {
    //       await queryFulfilled;
    //     } catch (err) {
    //       // console.error("fetch failed:", err);
    //     }
    //   },
    //   invalidatesTags: ["AdminOrders", "UserOrders"],
    // }),
    // deleteProduct: builder.mutation({
    //   query: (credentials) => ({
    //     url: `products/${credentials}`,
    //     method: "DELETE",
    //     // body: credentials,
    //   }),
    //   onQueryStarted: async (arg, { queryFulfilled }) => {
    //     try {
    //       await queryFulfilled;
    //     } catch (err) {
    //       // console.error("fetch failed:", err);
    //     }
    //   },
    //   invalidatesTags: ["Product"],
    // }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyTokenMutation,
  useResendVerifyTokenMutation,
  useLoginMutation,
  useBecomeSellerMutation,

  useAddCategoryMutation,
  useGetAllCategoryQuery,
  useDeleteCategoryMutation,
  useGetCategoryByIdQuery,
  useEditCategoryMutation,

  useAddProductMutation,
  useEditProductMutation,
  useGetAllProductQuery,
  useGetAllProductFeaturedQuery,
  useDeleteProductMutation,
  useGetProductByIdQuery,

  useGetGoogleSigninQuery,

  // useLoginMutation,
  // useContactMutation,
  // useForgotPassMutation,
  // useResetPassMutation,
  // useEditUserMutation,
  // useEditUserPasswordMutation,
  // useGetAllProductQuery,
  // useGetVerifyPaymentQuery,
  // useGetAllUserOrdersQuery,
  // useGetAllOrdersQuery,
  // useGetAllUsersQuery,
  // useEditCategoryMutation,
  // useAddProductMutation,
  // useEditProductMutation,

  // useMarkOrderMutation,
  // usePaymentMutation,

  // useDeleteCategoryMutation,
  // useDeleteOrdersMutation,
  // useDeleteProductMutation,
} = productsApi;
