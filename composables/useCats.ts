export async function useCats() {
  const client = useSupabaseClient();

  const { data: cats } = await useAsyncData("cats", async () => {
    const { data } = await client
      .from("cats")
      .select('*')

    return data;
  })

  return cats
}