<script setup lang="ts">
import ContentPanel from "@/components/ContentPanel.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserInfoField from "@/components/UserInfoField.vue";
import UserAvatarField from "@/components/UserAvatarField.vue";
import AvatarWidget from "@/components/widgets/AvatarWidget.vue";
import PasswordWidget from "@/components/widgets/PasswordWidget.vue";
import { getUser, updateUser } from "@/helpers/user.ts";
import { onMounted, ref, computed, provide } from "vue";
import type { User } from "@/types/User.ts";
import { inputs } from "@/components/inputs/Profile";
import FormMessage from "@/components/FormMessage.vue";
import MaterialsField from "@/components/MaterialsField.vue";

const user = ref<User | null>(null);
const infoFieldsRef = ref([]);
const avatarWidgetRef = ref(null);
const passwordWidgetRef = ref(null);
const messageRef = ref(null);

const infoFields = computed(() => {
  if (!user.value) {
    return null;
  }
  return Object.fromEntries(
    Object.entries(inputs).map(([key, field]) => [
      key,
      {
        ...field,
        value: user.value[key] ?? "Not set",
      },
    ]),
  );
});

onMounted(async () => {
  user.value = await getUser();
});

function onAvatarClick() {
  avatarWidgetRef.value?.widgetRef.toggleWidget();
}
function onChangePasswordClick() {
  passwordWidgetRef.value?.widgetRef.toggleWidget();
}
function onToggleEdit() {
  console.log("onToggleShow");
}

async function onImageUpdated(url) {
  onFieldSubmit("avatar", url);
}
async function onUpdateMaterials(newMaterials) {
  onFieldSubmit("materials", newMaterials);
}
async function onFieldSubmit(fieldName, value) {
  try {
    user.value = await updateUser({ [fieldName]: value });
    infoFieldsRef.value.forEach((field) => {
      if (field.isEdit) {
        field.toggleEdit();
      }
    });
  } catch (error) {
    if (error.response?.data.message) {
      messageRef.value?.setMessages([error.response?.data.message]);
      infoFieldsRef.value.forEach((field) => {
        if (field.isEdit) {
          field.turnEditOff();
        }
      });
      setTimeout(() => {
        messageRef.value?.setMessages([]);
      }, 3000);
    } else {
      console.log("Error", error);
    }
  }
}
provide("messageRef", messageRef);
</script>
<template>
  <AvatarWidget
    ref="avatarWidgetRef"
    :url="user ? user.avatar : null"
    @image-updated="onImageUpdated"
  />
  <PasswordWidget ref="passwordWidgetRef" />
  <div
    v-if="user"
    class="profile-page flex flex-row w-full"
  >
    <ContentPanel class="w-1/2 mx-3 p-5">
      <div class="flex flex-col justify-between gap-3">
        <div class="flex flex-col justify-between items-center mb-3">
          <UserAvatarField
            class="h-20 w-20"
            :url="user.avatar"
            @click="onAvatarClick"
          />
        </div>
        <div class="user-info flex flex-col gap-3">
          <ContentPanel class="p-3">
            <FormMessage
              ref="messageRef"
              type="error"
            />
            <UserInfoField
              v-for="([fieldKey, item], index) in Object.entries(infoFields)"
              :key="index"
              ref="infoFieldsRef"
              :name="fieldKey"
              :label="item.label"
              :value="item['value']"
              class="my-3"
              :input-type="item.inputType ?? 'text'"
              :validation="item.validation"
              @toggle-edit="onToggleEdit"
              @submit="onFieldSubmit"
            />
          </ContentPanel>
          <BaseButton
            label="Change password"
            @clicked="onChangePasswordClick"
          />
        </div>
      </div>
    </ContentPanel>
    <ContentPanel class="w-1/2 mx-3 p-5">
      <div class="user-qualities flex flex-col gap-3">
        <UserInfoField
          :ref="(el) => infoFieldsRef.push(el)"
          name="description"
          label="Profile description"
          :value="user.description ?? 'Not set'"
          class="my-3"
          input-type="textarea"
          @toggle-edit="onToggleEdit"
          @submit="onFieldSubmit"
        />
        <MaterialsField
          :materials="user.materials ?? []"
          @update-materials="onUpdateMaterials"
        />
      </div>
    </ContentPanel>
  </div>
  <div v-else>
    Loading...
  </div>
</template>
