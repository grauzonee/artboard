<script setup lang="ts">
import {ref, onMounted, defineExpose, defineProps} from 'vue'

const props = defineProps({
    type: {
        type: String,
        default: "info"
    }
});

const messages = ref([]);
let bgColorClass = 'bg-orange-600';
let iconName = 'circle-exclamation';

onMounted(() => {
    if (props.type === 'success') {
        bgColorClass = 'bg-emerald-600';
        iconName = 'circle-check';
    } 
    if (props.type === 'info') {
        bgColorClass = 'bg-blue-600';
        iconName = 'circle-info';
    }
})

function setMessages(messageValues: string[] | null) {
    messages.value = messageValues;
}

function canShowMessage() {
    return Array.isArray(messages.value) && messages.value.length > 0 && props.type == 'error';
}


defineExpose({
    setMessages
})
</script>
<template>
  <transition name="message">
    <div
      v-if="canShowMessage()"
      :class="['w-full rounded-md py-3 px-5 text-white font-poppies font-semibold flex flex-row content-left items-center gap-2', bgColorClass]"
    >
      <font-awesome-icon
        class="mr-2"
        :icon="iconName"
      />
      <div class="messages flex flex-col gap-1">
        <span
          v-for="(message, index) in messages"
          :key="index"
        >
          {{ message }}
        </span>
      </div>
    </div>
  </transition>
</template>
<style scoped>
    .message-enter-from {
        opaity: 0;
    }
    .message-enter-to {}
    .message-leave-from {}
    .message-leave-to {
        opacity: 0;
    }
    .message-enter-active {
        transition: opacity 2s ease-in;
    } 
    .message-leave-active {
        transition: opacity 2s ease-in;
    } 
</style>
