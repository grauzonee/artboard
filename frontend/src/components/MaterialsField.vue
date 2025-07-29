<script setup lang="ts">
import { ref } from "vue";
import BaseInput from "@/components/BaseInput.vue";

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
function deleteMaterial(material) {
  let newMaterials = props.materials ?? [];
  const index = newMaterials.indexOf(material);
  if (index !== -1) {
    newMaterials.splice(index, 1);
  }
  emit("updateMaterials", newMaterials);
  turnAddOff();
}
</script>
<template>
  <div class="flex flex-col">
    <label class="flex flex-row items-center justify-between"
      >Materials:
      <font-awesome-icon
        icon="plus"
        class="h-2 text-bold pointer text-gray-500 bg-primary-orange text-white rounded-full p-1"
        @click="toggleAdd"
      />
    </label>
    <div class="flex flex-row w-100" v-if="isAdd">
      <BaseInput v-model="newMaterial" border-width="1px" class="my-2" />

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
      <span
        v-for="(material, index) in materials"
        class="block rounded shaded-sm px-5 py-2 bg-primary-violet text-white font-bold relative"
        :key="index"
      >
        <span
          class="absolute top-0 right-0 h-3 w-3 bg-red-600 rounded-full border border-gray-500 flex items-center justify-center text-xs cursor-pointer"
          @click="deleteMaterial(material)"
        >
          <font-awesome-icon icon="xmark" class="h-2 cursor-pointer" />
        </span>

        {{ material }}</span
      >
    </div>
  </div>
</template>
