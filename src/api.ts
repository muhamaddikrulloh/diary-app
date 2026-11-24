export type Diary = {
  id: number;
  title: string;
  diary_date: string;
  body: string;
  mood: string;
};

const API_URL =
  process.env.EXPO_PUBLIC_API_URL;

function baseUrl() {
  if (!API_URL) {
    throw new Error(
      "EXPO_PUBLIC_API_URL belum diatur"
    );
  }

  return API_URL;
}

export async function getDiaries() {
  const response = await fetch(
    `${baseUrl()}/api/diaries`
  );

  if (!response.ok) {
    throw new Error(
      "Gagal mengambil data"
    );
  }

  return response.json();
}

export async function createDiary(
  data: Omit<Diary, "id">
) {
  const response = await fetch(
    `${baseUrl()}/api/diaries`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Gagal menambah diary"
    );
  }

  return response.json();
}

export async function updateDiary(
  id: number,
  data: Omit<Diary, "id">
) {
  const response = await fetch(
    `${baseUrl()}/api/diaries/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Gagal mengubah diary"
    );
  }

  return response.json();
}

export async function deleteDiary(
  id: number
) {
  const response = await fetch(
    `${baseUrl()}/api/diaries/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Gagal menghapus diary"
    );
  }
}