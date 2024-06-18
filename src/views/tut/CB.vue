<template>
  <label for="chkAll">
    <input
      id="chkAll"
      :class="{'active': isChecked}"
      :checked="isChecked"
      type="checkbox"
      value="chkAll"
      @change="checkFormAll"
    >
    <em></em>
    <span>{{ label }}</span>
  </label>
</template>

<script>
export default {
  name: 'CheckboxAll',
  model: {
    prop: 'checkedNames',
    event: 'changeFormAll',
  },
  props: {
    checkedNames: {
      type: Array,
    },
    label: {
      type: String,
      default: '',
    },
    nameList: {
      type: Array,
    }
  },
  data() {
    return {

    }
  },
  computed: {
    isChecked() {
      return this.checkedNames.length === this.nameList.length
    }
  },
  methods: {
    // 이미 모든 요소가 체크되어 있을 때: 체크된 모든 요소 해제
    // 모든 요소가 체크되어있지 않을 때: 모든 요소 체크
    checkFormAll() {
      let arr1 = [...this.checkedNames]
      const arr2 = [...this.nameList]
      let union = []

      if (arr1.length === arr2.length) {
        arr1 = []
        union = []
      } else if (arr2.length > arr1.length) {
        const sum = arr1.concat(arr2)
        union = sum.filter((item, index) => sum.indexOf(item) === index)
      }

      this.$emit('changeFormAll', union)
    }
  },
}
</script>