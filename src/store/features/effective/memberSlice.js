import { filter, map } from 'lodash';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MemberService } from 'src/services/member.service';

const initialState = {
  loading: false,
  members: [
    {
        "id": "",
        "firstName": "Kouamé",
        "lastName": "Paul César",
        "sex": "Homme",
        "profession": "Couturier"
    }
  ],
  memberSearch: '',
  sortBy: 'newest',
  cart: [],
  total: 0,
  filters: {
    category: 'All',
    rating: '',
  },
  error: ''
};

export const memberSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },
    // GET PRODUCTS
    getMembers: (state, action) => {
        state.members = action.payload;
    },
    saveMember: (state, action) => {
        let member = action.payload;
        state.members.push(member);
    },
    updateMember: (state, action) => {
      let member = action.payload;
      let memberUpdated = filter(state.members, (m) => m.id === member.id);
      memberUpdated = member;
  },
    SearchMember: (state, action) => {
      state.memberSearch = action.payload;
    },
    setVisibilityFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
    //  SORT  PRODUCTS
    sortByMembers(state, action) {
      state.sortBy = action.payload;
    },
    //  FILTER PRODUCTS
    filterMembers(state, action) {
      state.filters.category = action.payload.category;
    },
    //  FILTER Reset
    filterReset(state) {
      state.filters.category = 'All';
      state.filters.price = 'All';
      state.sortBy = 'newest';
    },
    // ADD TO CART
    addToCart(state, action) {
      const product = action.payload;
      state.cart = [...state.cart, product];
    },
    // qty increment
    increment(state, action) {
      const productId = action.payload;
      const updateCart = map(state.cart, (product) => {
        if (product.id === productId) {
          return {
            ...product,
            qty: product.qty + 1,
          };
        }
        return product;
      });

      state.cart = updateCart;
    },
    // qty decrement
    decrement(state, action) {
      const productId = action.payload;
      const updateCart = map(state.cart, (product) => {
        if (product.id === productId) {
          return {
            ...product,
            qty: product.qty - 1,
          };
        }
        return product;
      });

      state.cart = updateCart;
    },
    // delete Cart
    deleteCart(state, action) {
      const updateCart = filter(state.cart, (item) => item.id !== action.payload);
      state.cart = updateCart;
    },
    // delete member.
    deleteMember(state, action) {
        let id = action.payload;
        state.members = filter(state.members, member => member.memberId !== id);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMembers.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchMembers.fulfilled, (state, action) => {
      state.loading = false;
      state.members = action.payload;
      state.error   = '';
    });

    builder.addCase(fetchMembers.rejected, (state, action) => {
      state.loading = false;
      state.members = [];
      state.error   = action.error.message;
    });
    }
});
export const {
  hasError,
  getMembers,
  saveMember,
  updateMember,
  SearchProduct,
  setVisibilityFilter,
  sortByMembers,
  filterMembers,
  sortByGender,
  increment,
  deleteCart,
  deleteMember,
  decrement,
  addToCart,
  sortByPrice,
  filterReset,
  sortByColor,
} = memberSlice.actions;

export const fetchMembers = createAsyncThunk('assembly/members', (assemblyId) => {
    return MemberService.getMembers(assemblyId);
});

export default memberSlice.reducer;
