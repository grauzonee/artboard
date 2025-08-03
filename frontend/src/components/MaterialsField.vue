<script setup lang="ts">
import { ref } from "vue";
import BaseInput from "@/components/BaseInput.vue";
import SingleMaterial from "@/components/SingleMaterial.vue";

const emit = defineEmits(["updateMaterials"]);
const isAdd = ref(false);
const newMaterial = ref(null);
const props = defineProps({
  materials: {
    type: Array,
    required: true,
  },
});
function toggleAdd() {
  if (props.materials.length >= 10) {
    return;
  }
  isAdd.value = !isAdd.value;
}

function turnAddOff() {
  isAdd.value = false;
  newMaterial.value = null;
}
function addMaterial() {
  if (props.materials.includes(newMaterial.value)) {
    turnAddOff();
    return;
  }
  let newMaterials = props.materials ?? [];
  newMaterials.push(newMaterial.value);
  emit("updateMaterials", newMaterials);
  turnAddOff();
}
function onDeleteMaterial(material) {
  let newMaterials = props.materials ?? [];
  const index = newMaterials.indexOf(material);
  if (index !== -1) {
    newMaterials.splice(index, 1);
  }
  emit("updateMaterials", newMaterials.value);
  turnAddOff();
}
</script>
<template>
  <div class="flex flex-col">
    <label class="flex flex-row items-center justify-between h-8">Materials:
      <font-awesome-icon
        icon="plus"
        class="md:h-2 text-bold cursor-pointer text-gray-500 bg-primary-orange text-white md:rounded-full p-1 h-6 w-12"
        @click="toggleAdd"
      />
    </label>
    <div
      v-if="isAdd"
      class="flex flex-row w-100"
    >
      <BaseInput
        v-model="newMaterial"
        border-width="1px"
        class="my-2"
      />

      <div
        class="w-1/6 flex flex-row justify-around items-center content-center"
      >
        <font-awesome-icon
          icon="circle-check"
          class="h-4 pointer text-emerald-500"
          @click="addMaterial"
        />
        <font-awesome-icon
          icon="xmark"
          class="h-4 cursor-pointer text-red-500"
          @click="turnAddOff"
        />
      </div>
    </div>
    <div class="w-full flex flex-row flex-wrap gap-1 mt-2">
      <SingleMaterial
        v-for="(material, index) in materials"
        :key="index"
        class="px-5 py-2 text-xs"
        :label="material"
        :can-delete="true"
        @delete-material="onDeleteMaterial(material)"
      />
    </div>
  </div>
</template>
