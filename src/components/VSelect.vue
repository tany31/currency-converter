<script setup lang="ts">
import { computed } from 'vue'

type Option = {
  name: string,
  value: string
}

type ModelValue = string

export interface SelectProps {
  modelValue?: ModelValue
  options?: Option[]
  placeholder?: string
}

const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: '',
  options: () => [],
  placeholder: '',
})

const emits = defineEmits<{
  'update:modelValue': [value: ModelValue]
}>()

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value)
})
</script>

<template>
  <select v-model="localValue" class="v-select" v-bind="$attrs">
    <option v-if="placeholder" :value="''" disabled>{{ placeholder }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<style lang="scss">
.v-select {
  border-radius: 4px;
  padding: 20px;
  border: 1px solid #c4c4c4;
  font-size: 18px;
  margin: 0;
  width: 100%;
  transition: 0.2s;
  appearance: none;
  cursor: pointer;

  &:focus,
  &:hover {
    border-color: #006fe8;
    outline: 0;
  }
}
</style>
