import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { clearCredentials, setCredentials } from "./slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001/",
  // baseUrl: "https://take-off-r3fp.onrender.com/",
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
  tagTypes: ["Category", "Product", "BuyerOrders", "SellerOrders"],

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

    // search: builder.query({
    //   query: ({ title, page = 1, limit = 10 }) =>
    //     `/product/search?title=${title}&page=${page}&limit=${limit}`,
    //   headers: { "Content-Type": "application/json" },
    // }),

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

    createOrder: builder.mutation({
      query: (credentials) => ({
        url: "/order/create",
        method: "POST",
        body: credentials,
        headers: { "Content-Type": "application/json" },
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          //   console.error("Register failed:", err);
        }
      },
      invalidatesTags: ["BuyerOrders", "SellerOrders"],
    }),

    becomeSeller: builder.mutation({
      query: (credentials) => ({
        url: "/seller/become-seller",
        method: "POST",
        body: credentials,
        headers: { "Content-Type": "application/json" },
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
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

    editProfile: builder.mutation({
      query: (formData) => ({
        url: "/auth/update-profile",
        method: "PATCH",
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

    getUserOrderByRef: builder.query({
      query: (ref) => ({
        url: `/order/by-reference/${ref}`,
        method: "GET",
      }),
    }),

    getOrderById: builder.query({
      query: (orderId) => ({
        url: `/order/${orderId}`,
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

    getUserProducts: builder.query({
      query: ({ page, limit }) =>
        `/product/user-products?page=${page}&limit=${limit}`,
      headers: { "Content-Type": "application/json" },
    }),

    getAllProduct: builder.query({
      // query: ({ page, limit, category, min, max, sort }) =>
      //   `/product/products?page=${page}&limit=${limit}`,
      query: ({
        page = 1,
        limit = 10,
        categories,
        minPrice,
        maxPrice,
        sort,
        inStock,
        outOfStock,
        searchQuery,
      }) => {
        const queryParams = new URLSearchParams();
        if (page) queryParams.append("page", page.toString());
        if (limit) queryParams.append("limit", limit.toString());
        if (searchQuery) queryParams.append("limit", searchQuery.toString());
        if (categories) {
          categories.forEach((cat) => {
            queryParams.append("categories", cat); // Append each category individually
          });
        }
        if (minPrice) queryParams.append("minPrice", minPrice.toString());
        if (maxPrice) queryParams.append("maxPrice", maxPrice.toString());
        if (sort) queryParams.append("sort", sort);
        if (inStock) queryParams.append("inStock", inStock.toString());
        if (outOfStock) queryParams.append("outOfStock", outOfStock.toString());

        return `/product/products?${queryParams.toString()}`;
      },
      providesTags: ["Product"],
      headers: { "Content-Type": "application/json" },
    }),

    search: builder.query({
      // query: ({ page, limit, category, min, max, sort }) =>
      //   `/product/products?page=${page}&limit=${limit}`,
      query: ({
        page = 1,
        limit = 10,
        categories,
        minPrice,
        maxPrice,
        sort,
        inStock,
        outOfStock,
        searchQuery,
      }) => {
        const queryParams = new URLSearchParams();
        if (page) queryParams.append("page", page.toString());
        if (limit) queryParams.append("limit", limit.toString());
        if (searchQuery)
          queryParams.append("searchQuery", searchQuery.toString());
        if (categories) {
          categories.forEach((cat) => {
            queryParams.append("categories", cat); // Append each category individually
          });
        }
        if (minPrice) queryParams.append("minPrice", minPrice.toString());
        if (maxPrice) queryParams.append("maxPrice", maxPrice.toString());
        if (sort) queryParams.append("sort", sort);
        if (inStock) queryParams.append("inStock", inStock.toString());
        if (outOfStock) queryParams.append("outOfStock", outOfStock.toString());

        return `/product/products?${queryParams.toString()}`;
      },
      headers: { "Content-Type": "application/json" },
    }),

    getAllProductFeatured: builder.query({
      query: () => "/product/featured",
      // providesTags: ["Product"],
      headers: { "Content-Type": "application/json" },
    }),

    getUserDetails: builder.query({
      query: () => "/auth/user-details",
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

    getProductReviews: builder.query({
      query: ({ productId, page, limit }) =>
        `/review/list/${productId}?page=${page}&limit=${limit}`,
      headers: { "Content-Type": "application/json" },
    }),

    addRating: builder.mutation({
      query: (credentials) => ({
        url: "/review/add-rating",
        method: "POST",
        body: credentials,
      }),

      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          // console.log("registered");
          await queryFulfilled;
        } catch (err) {
          // console.error("category add failed:", err);
        }
      },
    }),
    getBuyerOrders: builder.query({
      query: () => "/order/buyer",
      providesTags: ["BuyerOrders"],

      headers: { "Content-Type": "application/json" },
    }),

    getSellerOrders: builder.query({
      query: () => "/order/seller",
      providesTags: ["SellerOrders"],
      headers: { "Content-Type": "application/json" },
    }),

    markOrder: builder.mutation({
      query: ({ action, id }) => ({
        url: `/order/mark-order-status/${id}`,
        method: "PATCH",
        body: action,
      }),

      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          // console.log("registered");
          await queryFulfilled;
        } catch (err) {
          // console.error("category add failed:", err);
        }
      },
      invalidatesTags: ["SellerOrders", "BuyerOrders"],
    }),
    getAllChats: builder.query({
      query: () => "/chat/all-chats",
      // providesTags: ["Product"],
      headers: { "Content-Type": "application/json" },
    }),
    getAnalytics: builder.query({
      query: () => "/order/analytics",

      headers: { "Content-Type": "application/json" },
    }),
    getMonthlySummary: builder.query({
      query: () => "/order/monthly-summary",

      headers: { "Content-Type": "application/json" },
    }),

    getSalesByCat: builder.query({
      query: () => "/order/sales-by-category",

      headers: { "Content-Type": "application/json" },
    }),

    getEarningsVsPayouts: builder.query({
      query: () => "/order/earnings-vs-payouts",

      headers: { "Content-Type": "application/json" },
    }),
    getWalletBalance: builder.query({
      query: () => "/wallet/user-wallet",

      headers: { "Content-Type": "application/json" },
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyTokenMutation,
  useResendVerifyTokenMutation,
  useLoginMutation,
  useBecomeSellerMutation,
  useEditProfileMutation,
  useAddCategoryMutation,
  useGetAllCategoryQuery,
  useDeleteCategoryMutation,
  useGetProductReviewsQuery,
  useEditCategoryMutation,

  useAddProductMutation,
  useAddRatingMutation,
  useEditProductMutation,
  useGetAllProductQuery,
  useGetUserProductsQuery,
  useGetUserOrderByRefQuery,
  useGetOrderByIdQuery,
  useGetAllProductFeaturedQuery,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useGetCategoryByIdQuery,
  useGetUserDetailsQuery,
  useCreateOrderMutation,
  useLazySearchQuery,

  useGetGoogleSigninQuery,

  useGetBuyerOrdersQuery,
  useGetSellerOrdersQuery,
  useMarkOrderMutation,
  useGetAllChatsQuery,

  useGetAnalyticsQuery,
  useGetMonthlySummaryQuery,
  useGetSalesByCatQuery,
  useGetEarningsVsPayoutsQuery,
  useGetWalletBalanceQuery,
} = productsApi;
