<script setup lang="ts">
import {defineProps, ref} from 'vue';
import BaseInput from '@/components/BaseInput.vue'

const emit = defineEmits(['toggleEdit'])
defineProps({
    label: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    inputType: {
        type: String,
        default: 'text' // textarea | date
    }
})
const isEdit = ref(false);
function toggleEdit() {
    emit('toggleEdit')
   isEdit.value = !isEdit.value; 
}

function turnEditOff() {
    isEdit.value = false;
}
defineExpose({turnEditOff})


</script>
<template>
  <div class="user-info-field">
    <span class="text-gray-600 font-poppins font-semibold mb-1 block">{{ label }}</span>
    <div
      v-if="!isEdit"
      class="flex flex-row justify-between items-center px-2"
    >
      <span>{{ value }}</span>
      <font-awesome-icon
        icon="pencil"
        class="h-2 pointer text-gray-500"
        @click="toggleEdit"
      />
    </div>
    <div
      v-if="isEdit"
      class="flex flex-row justify-between items-center px-2"
    >
      <BaseInput
        :placeholder="value"
        border-width="1px"
        class="h-7 w-2/3"
        :input-type="inputType"
      />
      <div class="w-1/6 flex flex-row justify-between items-center">
        <font-awesome-icon
          icon="circle-check"
          class="h-4 pointer text-emerald-500"
          @click="toggleEdit"
        />
        <font-awesome-icon
          icon="xmark"
          class="h-4 pointer text-red-500"
          @click="toggleEdit"
        />
      </div>
    </div>
  </div>
</template>
