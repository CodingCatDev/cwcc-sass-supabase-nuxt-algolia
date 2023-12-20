export async function useInfo() {
  const client = useSupabaseClient();

  const { data: info } = await useAsyncData("info", async () => {
    const { data } = await client
      .from("table")
      .select('*')

    return data;
  })

  return info
}