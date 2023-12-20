<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const state = reactive({
  email: "",
});

const loginError = ref(false);
const loginSuccess = ref(false);

async function onSubmit() {
  const { error } = await supabase.auth.signInWithOtp({
    email: state.email,
    options: {
      emailRedirectTo: "http://localhost:3000/confirm",
    },
  });

  if (error) {
    loginError.value = true;
    loginSuccess.value = false;
  } else {
    loginSuccess.value = true;
    loginError.value = false;
  }
}

watch(
  user,
  () => {
    if (user.value) {
      return navigateTo("/");
    }
  },
  { immediate: true }
);
</script>

<template>
  <UContainer :ui="{ constrained: 'max-w-xl' }">
    <UCard class="mt-10">
      <template #header>
        <div class="flex justify-between">
          <h1 class="font-bold text-xl">Log in</h1>
          <UColorModeButton />
        </div>
      </template>

      <section>
        <UForm
          v-if="!loginError && !loginSuccess"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormGroup label="Email" name="email" v-slot="{ error }">
            <UInput
              v-model="state.email"
              type="email"
              placeholder="Enter email"
              :icon="
                error
                  ? 'i-heroicons-exclamation-triangle-20-solid'
                  : 'i-heroicons-envelope'
              "
            />
          </UFormGroup>

          <UButton type="submit"> Submit </UButton>
        </UForm>
        <UAlert
          v-if="loginError"
          color="red"
          variant="subtle"
          icon="i-heroicons-exclamation-triangle-20-solid"
          title="There was an error"
          description="Please reload this page to try again."
        />
        <UAlert
          v-if="loginSuccess"
          color="green"
          variant="subtle"
          icon="i-heroicons-check-badge"
          title="Check your email"
          description="A magic login link has been send to your email address."
        />
      </section>
    </UCard>
  </UContainer>
</template>
