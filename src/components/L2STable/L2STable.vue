<template>
  <div :class="$style.root">
    <b-table-simple>
      <b-thead>
        <tr>
          <th v-for="(title, titleIndex) in data" :key="titleIndex">
            {{ title }}
          </th>
        </tr>
      </b-thead>
    </b-table-simple>
  </div>
</template>
<script>
export default {
  props: {
    rows: {
      type: Object,
      required: true,
    },
    header: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style lang="scss" module>
@import "./styles.scss";
</style>
