import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import {
  createDiary,
  deleteDiary,
  getDiaries,
  updateDiary,
  type Diary,
} from "./api";

type DiaryState = {
  entries: Diary[];
  loading: boolean;
  error: string | null;
};

const initialState: DiaryState = {
  entries: [],
  loading: false,
  error: null,
};

export const fetchDiaries =
  createAsyncThunk(
    "diary/fetch",
    async () => {
      return await getDiaries();
    }
  );

export const addDiary =
  createAsyncThunk(
    "diary/add",
    async (
      data: Omit<Diary, "id">
    ) => {
      return await createDiary(data);
    }
  );

export const editDiary =
  createAsyncThunk(
    "diary/edit",
    async ({
      id,
      data,
    }: {
      id: number;
      data: Omit<Diary, "id">;
    }) => {
      return await updateDiary(
        id,
        data
      );
    }
  );

export const removeDiary =
  createAsyncThunk(
    "diary/remove",
    async (id: number) => {
      await deleteDiary(id);
      return id;
    }
  );

const diarySlice =
  createSlice({
    name: "diary",
    initialState,
    reducers: {},

    extraReducers:
      (builder) => {
        builder
          .addCase(
            fetchDiaries.pending,
            (state) => {
              state.loading = true;
            }
          )
          .addCase(
            fetchDiaries.fulfilled,
            (state, action) => {
              state.loading = false;
              state.entries =
                action.payload;
            }
          )
          .addCase(
            fetchDiaries.rejected,
            (state) => {
              state.loading = false;
              state.error =
                "Gagal mengambil data";
            }
          )

          .addCase(
            addDiary.fulfilled,
            (state, action) => {
              state.entries.unshift(
                action.payload
              );
            }
          )

          .addCase(
            editDiary.fulfilled,
            (state, action) => {
              const index =
                state.entries.findIndex(
                  (item) =>
                    item.id ===
                    action.payload.id
                );

              if (index >= 0) {
                state.entries[index] =
                  action.payload;
              }
            }
          )

          .addCase(
            removeDiary.fulfilled,
            (state, action) => {
              state.entries =
                state.entries.filter(
                  (item) =>
                    item.id !==
                    action.payload
                );
            }
          );
      },
  });

export default diarySlice.reducer;