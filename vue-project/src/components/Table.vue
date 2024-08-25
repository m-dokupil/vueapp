<template>
  <div class="table-container">
    <a-card class="table-card">
      <template #title>
        <div class="table-header">
          <span>Liquidity Models</span>
          <div>
            <a-button type="primary" class="add-btn">+</a-button>
            <a-button type="primary" class="save-btn">Save changes</a-button>
            <a-button type="default" class="back-btn">Back</a-button>
          </div>
        </div>
      </template>
      <a-table
        :columns="liquidityColumns"
        :dataSource="liquidityData"
        rowKey="liquidity"
        rowSelection="checkbox"
        bordered
        size="middle"
      >
        <template #bodyCell="{ column, record }">
          <span v-if="column.dataIndex === 'allStreams'" @click="showAllStreamsModal(record.allStreams)">
            <a>{{ record.allStreams }}</a>
          </span>
          <div v-else-if="column.dataIndex === 'defaultMakersStreams'" @click="showMultiSelectModal(record.defaultMakersStreams)">
            <a-tag v-for="(stream, index) in record.defaultMakersStreams.split(', ')" :key="index">{{ stream }}</a-tag>
          </div>
          <a-switch v-else-if="column.dataIndex === 'enable'" :checked="record.enable" @change="toggleEnable(record)" />
          <a-button v-else-if="column.dataIndex === 'delete'" type="danger" icon="delete" @click="deleteRecord(record)" />
          <template v-else>
            <a-input v-if="editingRecord === record && editingField === column.dataIndex"
              v-model:value="record[column.dataIndex]"
              @mouseleave="stopEditing"
              @pressEnter="stopEditing"
              style="width: 100%;"
            />
            <span v-else @click="startEditing(record, column.dataIndex)">{{ record[column.dataIndex] }}</span>
          </template>
        </template>
      </a-table>
    </a-card>

    <a-card class="table-card" style="margin-top: 20px;">
      <template #title>
        <div class="table-header">
          <span>Results</span>
          <div>
            <a-button type="primary" class="save-btn">Save changes</a-button>
            <a-button type="default" class="back-btn">Back</a-button>
          </div>
        </div>
      </template>
      <a-table
        :columns="resultsColumns"
        :dataSource="resultsData"
        rowKey="symbol"
        rowSelection="checkbox"
        bordered
        size="middle"
      >
        <template #bodyCell="{ column, record }">
          <div v-if="column.dataIndex === 'makersStreams'" @click="showMultiSelectModal(record.makersStreams)">
            <a-tag v-for="(stream, index) in record.makersStreams.split(', ')" :key="index">{{ stream }}</a-tag>
          </div>
          <a-switch v-else-if="column.dataIndex === 'enable'" :checked="record.enable" @change="toggleEnable(record)" />
          <a-button v-else-if="column.dataIndex === 'delete'" type="danger" icon="delete" @click="deleteRecord(record)" />
          <span v-else>{{ record[column.dataIndex] }}</span>
        </template>
      </a-table>
    </a-card>

    <!-- Modal for All Streams -->
    <a-modal v-model:open="isAllStreamsModalVisible" title="All Streams" @ok="handleOk" @cancel="handleCancel">
      <p>{{ selectedStream }}</p>
    </a-modal>

    <!-- Modal for MultiSelect (Default Makers Streams & Makers Streams) -->
    <a-modal v-model:open="isMultiSelectModalVisible" title="Select Streams" @ok="handleMultiSelectOk" @cancel="handleCancel">
      <a-select
        mode="multiple"
        :value="selectedStreams"
        @change="handleSelectChange"
        style="width: 100%"
      >
        <a-select-option v-for="stream in availableStreams" :key="stream">{{ stream }}</a-select-option>
      </a-select>
      <div class="chips-container">
        <a-tag v-for="(chip, index) in selectedStreams" :key="index" closable @close="removeChip(chip)">
          {{ chip }}
        </a-tag>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    // Modal state
    const isAllStreamsModalVisible = ref(false);
    const isMultiSelectModalVisible = ref(false);
    const selectedStream = ref('');
    const selectedStreams = ref<string[]>([]);
    const editingRecord = ref<any>(null);
    const editingField = ref<string>('');

    // Example data
    const availableStreams = ['Stream1', 'Stream2', 'Stream3', 'Stream4'];

    // Columns for Liquidity Models table
    const liquidityColumns = reactive([
      {
        title: 'Liquidity',
        dataIndex: 'liquidity',
        key: 'liquidity',
        sorter: (a: { liquidity: string; }, b: { liquidity: any; }) => a.liquidity.localeCompare(b.liquidity),
        editable: true,
      },
      {
        title: 'All streams',
        dataIndex: 'allStreams',
        key: 'allStreams',
        sorter: (a: { allStreams: string; }, b: { allStreams: any; }) => a.allStreams.localeCompare(b.allStreams),
      },
      {
        title: 'Default Makers Streams',
        dataIndex: 'defaultMakersStreams',
        key: 'defaultMakersStreams',
        sorter: (a: { defaultMakersStreams: string; }, b: { defaultMakersStreams: any; }) => a.defaultMakersStreams.localeCompare(b.defaultMakersStreams),
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        sorter: (a: { description: string; }, b: { description: any; }) => a.description.localeCompare(b.description),
        editable: true,
      },
      {
        title: 'Enable',
        dataIndex: 'enable',
        key: 'enable',
      },
      {
        title: 'Delete',
        dataIndex: 'delete',
        key: 'delete',
      },
    ]);

    // Columns for Results table (similar to Liquidity Models)
    const resultsColumns = reactive([
      {
        title: 'Symbol',
        dataIndex: 'symbol',
        key: 'symbol',
        sorter: (a: { symbol: string; }, b: { symbol: any; }) => a.symbol.localeCompare(b.symbol),
        editable: true,
      },
      {
        title: 'Makers Streams',
        dataIndex: 'makersStreams',
        key: 'makersStreams',
        sorter: (a: { makersStreams: string; }, b: { makersStreams: any; }) => a.makersStreams.localeCompare(b.makersStreams),
      },
    ]);

    // Example data
    const liquidityData = reactive([
      { liquidity: 'model2', allStreams: 'Stream1, Stream2', defaultMakersStreams: 'Makers1, Makers2', description: 'desc1', enable: true },
    ]);

    const resultsData = reactive([
      { symbol: 'BTCEUR', makersStreams: 'Makers1, Makers2' },
    ]);

    // Functions for handling modals
    const showAllStreamsModal = (stream: string) => {
      selectedStream.value = stream;
      isAllStreamsModalVisible.value = true;
    };

    const showMultiSelectModal = (streams: string) => {
      selectedStreams.value = streams.split(', ');
      isMultiSelectModalVisible.value = true;
    };

    const handleOk = () => {
      isAllStreamsModalVisible.value = false;
    };

    const handleMultiSelectOk = () => {
      isMultiSelectModalVisible.value = false;
      // Save the selected streams to the appropriate column
    };

    const handleCancel = () => {
      isAllStreamsModalVisible.value = false;
      isMultiSelectModalVisible.value = false;
    };

    const handleSelectChange = (value: string[]) => {
      selectedStreams.value = value;
    };

    const removeChip = (chip: string) => {
      selectedStreams.value = selectedStreams.value.filter((item) => item !== chip);
    };

    const toggleEnable = (record: any) => {
      record.enable = !record.enable;
    };

    const deleteRecord = (record: any) => {
      const index = liquidityData.indexOf(record);
      if (index > -1) {
        liquidityData.splice(index, 1);
      }
    };

    const startEditing = (record: any, field: string) => {
      editingRecord.value = record;
      editingField.value = field;
    };

    const stopEditing = () => {
      editingRecord.value = null;
      editingField.value = '';
    };


    return {
      editingRecord,
      editingField,
      liquidityColumns,
      resultsColumns,
      liquidityData,
      resultsData,
      isAllStreamsModalVisible,
      isMultiSelectModalVisible,
      selectedStream,
      selectedStreams,
      availableStreams,
      startEditing,
      stopEditing,
      showAllStreamsModal,
      showMultiSelectModal,
      handleOk,
      handleMultiSelectOk,
      handleCancel,
      handleSelectChange,
      removeChip,
      toggleEnable,
      deleteRecord,
    };
  },
});
</script>

<style scoped>
.table-container {
  margin: 20px;
}

.dark-mode .table-card {
  background-color: #1c1c1c;
}
.dark-mode .table-header {
  color: #000000;
}

.table-card {
  border-radius: 8px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.add-btn {
  margin-right: 10px;
}

.save-btn {
  margin-right: 10px;
}

.ant-table {
  background-color: #333;
  color: white;
}

.ant-table-thead > tr > th {
  background-color: #444;
  color: white;
}

.ant-table-tbody > tr > td {
  background-color: #222;
  color: white;
}

.ant-card-head {
  background-color: #333;
  border-bottom: 1px solid #444;
}

.ant-card-body {
  padding: 0;
}

.ant-table-row {
  &:hover {
    background-color: #2a2a2a;
  }
}

.chips-container {
  margin-top: 10px;
}

.a-tag {
  margin-right: 5px;
  margin-top: 5px;
}
</style>
