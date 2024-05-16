import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
	list: [],
	payment: null,
	error: "",
	loading: false,
};

// ADD_ Payment to payslip
export const addPayslipPayment = createAsyncThunk(
	"payslip/addPayslipPayment",
	async (id) => {
		try {
			const { data } = await axios({
				method: "put",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `payroll/payment/${id}`,
			});
			toast.success("Paiement créé avec succès");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Erreur lors de l'ajout du paiement, réessayez");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const paymentSlice = createSlice({
	name: "payment",
	initialState,
	reducers: {
		clearPayment: (state) => {
			state.payment = null;
		},
	},
	extraReducers: (builder) => {
		// 2) ====== builders for addPayslipPayment ======

		builder.addCase(addPayslipPayment.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addPayslipPayment.fulfilled, (state, action) => {
			state.loading = false;

			state.payment = action.payload.data;
		});

		builder.addCase(addPayslipPayment.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSinglePayslip ======
	},
});

export default paymentSlice.reducer;
export const { clearPayment } = paymentSlice.actions;
