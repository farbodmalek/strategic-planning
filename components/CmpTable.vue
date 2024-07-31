<template>
  <div class="px-4">
    <DataTable
        @page="changePage($event)"
        :paginator="true" :rows="5" :rowsPerPageOptions="[5, 10, 25]"
        showGridlines
        :size="totalRows"
        :total-records="totalRows"
        :value="products"
        tableStyle="min-width: 50rem">
      <Column
          v-for="col of cols"
          :key="col.field"
          :field="col.field"
          :header="col.header">
        <template #body="slotProps">
            <span :class="col.format === 'action' ? 'cursor-pointer' : ''"
                  @click="emitData(slotProps.data, col)">
              <i v-if="col.format === 'action'" class="ms-1" :class="col.icon"></i>
              {{ slotProps.data[col.field] || '---' }}
            </span>
          <div v-if="col.secondField" class="text-xs text-primary">
            <!--<span>{{ slotProps.data[col.secondField] || '-&#45;&#45;' }}</span>-->
          </div>
        </template>
      </Column>

      <template v-if="hasAction">
        <Column header="عملیات" class="d-flex py-4 align-items-center justify-content-center">
          <template #body="slotProps">
              <span v-if="slotProps.data.columnActions?.length>3">
              <i type="button" class="pi pi-ellipsis-v" @click="toggle"
                 aria-haspopup="true"
                 aria-controls="overlay_menu"></i>
              <Menu ref="menu" id="overlay_menu" class="p-0" :model="slotProps.data.columnActions" :popup="true">
                <template #item="{ item, props }">
                  <span v-ripple @click="colAction(item, slotProps.data)" class="cursor-pointer">
                    <span :class="item.icon"/>
                    <span class="me-2">{{ item.label }}</span>
                  </span>
              </template>
              </Menu>
              </span>

            <template v-else>
              <div v-for="act of slotProps.data.columnActions" class="me-2">
                <div class="cursor-pointer" @click="colAction(act, slotProps.data)" v-tooltip="act.label">
                  <span><i :class="[act.icon, act.style]"></i></span>
                </div>
              </div>
            </template>
          </template>
        </Column>
      </template>
    </DataTable>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';

const props = defineProps({
  cols: [],
  products: [],
  hasAction: {
    type: Boolean,
    default: true
  },
  totalRows: {
    type: Number,
    default: true
  },
});


const emit = defineEmits(['action', 'emited']);

const changePage = (event) => {
  emit('emited', event);
}

const menu = ref(null)

const toggle = (event) => {
  menu.value.toggle(event);
};

const emitData = (data, col) => {
  const body = {
    col: col,
    data: data
  }
  if (col && col.format === 'action')
    emit('action', body);
}

const colAction = (act, data) => {
  act.onClick(data);
}
</script>
