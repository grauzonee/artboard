<script setup lang="ts">
import BaseWidget from "@/components/BaseWidget.vue";
import BaseButton from "@/components/BaseButton.vue";
import { ref } from "vue";

const widgetRef = ref(null);
defineProps({
  label: {
    type: String,
    default: "Are you sure?",
  },
});
defineEmits(["confirmed"]);
defineExpose({
  widgetRef,
  toggleWidget: () => widgetRef.value?.toggleWidget(),
});
</script>
<template>
  <BaseWidget ref="widgetRef">
    <div class="flex flex-col justify-center p-4">
      <p class="text-xl block mb-5 text-center">
        {{ label }}
      </p>
      <div class="flex flex-row gap-5">
        <BaseButton
          label="No"
          bg-color="bg-lightGray"
          text-color="text-primary-violet"
          class="border border-primary-violet"
          @clicked="() => widgetRef?.toggleWidget()"
        />
        <BaseButton
          label="Yes"
          @clicked="$emit('confirmed')"
        />
      </div>
    </div>
  </BaseWidget>
</template>
