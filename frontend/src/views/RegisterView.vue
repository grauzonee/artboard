<script setup lang="ts">
import BaseForm from "@/components/BaseForm.vue";
import BaseButton from "@/components/BaseButton.vue";
import { inject, onMounted, ref } from "vue";
import bgImg from "@/assets/images/login-bg.png";
import { inputs } from "@/components/inputs/Register.ts";
import { signUp } from "@/helpers/user.ts";
import { FormError } from "@/types/FormError.ts";
import router from "@/router/index.ts";

const setMainStyle = inject("setMainStyle");
const formRef = ref(null);

// Set bg image to the layout
onMounted(() => {
  setMainStyle?.({
    backgroundImage: `url(${bgImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
  });
});

async function onFormSubmit() {
  if (formRef.value?.validate() === false) {
    return;
  }
  const formData = formRef.value?.formData;
  try {
    const user = await signUp(formData);
    if (user.id) {
      router.push("/");
    }
  } catch (error) {
    if (error.response?.data?.message) {
      const formError = new FormError([error.response.data.message], []);
      formRef.value?.setError(formError);
    }
  }
}
</script>
<template>
  <div class="login-page flex flex-col items-end">
    <div class="w-1/2 mt-10">
      <BaseForm ref="formRef" :inputs="inputs" class="border border-white-1">
        <BaseButton
          label="Sign up"
          bg-color="bg-primary-violet"
          @clicked="onFormSubmit"
        />
        <span class="text-gray-400 text-sm w-full text-center mt-3"
          >Already have an account?</span
        >
        <router-link to="/login" class="w-full block">
          <BaseButton
            label="Log in"
            bg-color="bg-lightGray"
            text-color="text-primary-violet"
            class="border border-primary-violet"
          />
        </router-link>
      </BaseForm>
    </div>
  </div>
</template>
