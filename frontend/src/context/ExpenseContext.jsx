import { createContext, useEffect, useReducer, useContext } from "react";

export const ExpenseContext = createContext();

const initialState = {
  expenses: [],
  loading: false,
  error: null,
};

const expenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return { ...state, expenses: [...state.expenses, action.payload] };

    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload.id
        ),
      };

    case "UPDATE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        ),
      };

    case "SET_EXPENSES":
      return { ...state, expenses: action.payload };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  useEffect(() => {
    try {
      localStorage.setItem("expenses", JSON.stringify(state.expenses));
    } catch (error) {
      console.error("failed to save expenses : ", error);
      dispatch({ type: "SET_ERROR", payload: error });
    }
  }, [state.expenses]);

  const value = {
    ...state,
    addExpense: (expense) => {
      const newExpense = {
        ...expense,
        id: crypto.randomUUID(),
      };
      dispatch({ type: "ADD_EXPENSE", payload: newExpense });
    },
    deleteExpense: (id) => {
      dispatch({ type: "DELETE_EXPENSE", payload: { id } });
    },
    updateExpense: (expense) => {
      dispatch({ type: "UPDATE_EXPENSE", payload: expense });
    },
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error("useExpenses must be used within an ExpenseProvider");
  }
  return context;
};
