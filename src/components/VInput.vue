<script setup lang="ts">
import { computed } from 'vue'

export interface InputProps {
  modelValue?: string
}

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const localModelValue = computed({
  get() {
    return props.modelValue
  },
  set(value: string) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <input v-model="localModelValue" class="v-input" v-bind="$attrs" />
</template>

<style lang="scss">
.v-input {
  border-radius: 4px;
  padding: 20px;
  border: 1px solid #c4c4c4;
  font-size: 18px;
  margin: 0;
  width: 100%;
  transition: 0.2s;

  &:focus,
  &:hover {
    border-color: #006fe8;
    outline: 0;
  }
}
</style>
