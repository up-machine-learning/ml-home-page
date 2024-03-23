<template>
  <section id="search-result">
    <div class="container">
      <div class="row my-4">
        <div class="col d-md-flex align-items-center">
          <div class="d-flex align-items-center">
            <span class="p-2 me-2"
              ><Button
                icon="pi pi-chevron-left"
                class="p-button-text p-button-lg p-button-rounded p-button-secondary"
                text
                rounded
                aria-label="Back"
                @click="$router.go(-1)"
            /></span>
            <h2>Destination</h2>
          </div>
          <div class="d-md-flex mb-3 ms-auto">
            <div class="form-group w-100">
              <label for="">Name:</label>
              <InputText v-model="searchForm.name" class="w-100" />
            </div>
            <div class="d-none d-md-block m-2 mt-auto"></div>
            <div class="form-group w-100">
              <label for="">Type:</label>
              <br />
              <!-- <InputText v-model="searchForm.type" class="w-100" /> -->
              <Dropdown
                v-model="searchForm.type"
                :options="typeOptions"
                optionLabel="name"
                placeholder="Select a type"
                class="w-100"
                style="width: 240px"
              />
            </div>
            <div>
              <div>&nbsp;</div>
              <Button
                label="Search"
                class="ms-2 rounded"
                @click="onSearch"
              ></Button>
            </div>
          </div>
          <hr />
        </div>
      </div>

      <div v-if="isLoading" class="d-flex justify-content-center">
        <ProgressSpinner />
      </div>

      <div class="my-4" v-if="!isLoading">
        <div class="row">
          <div
            class="col-12 col-md-6"
            v-for="(value, index) of searchResults"
            :key="index"
          >
            <div
              class="card mb-3 border-0 cursor-pointer"
              @click="onCardClick(value)"
            >
              <div class="row g-0">
                <div class="col-md-5 thumbnail-img" style="height: 240px">
                  <img
                    :src="value.imageUrl"
                    class="img-fluid rounded-start h-100 w-100 object-fit-cover"
                    alt="..."
                  />
                </div>
                <div class="col-md-7">
                  <div class="card-body">
                    <Tag :value="value.type" />
                    <h5 class="card-title">{{ value.name }}</h5>
                    <div class="d-flex align-items-center">
                      <Rating
                        :model-value="Number(value.rating)"
                        :cancel="false"
                      />
                      <p class="ms-2 mb-0"> ( {{ value.rating }} )</p>
                    </div>

                    <small>Review Count: {{ value.reviewCount }}</small>
                    <p>{{ formatCurrency(value.price) }} USD </p>
                    <!-- <p class="card-text line-clamp-3">{{
                              value.description
                            }}</p> -->

                    <Tag
                      v-for="tag of value.tags"
                      :key="tag"
                      severity="secondary"
                      :value="tag"
                      class="me-2"
                    ></Tag>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Paginator
        :rows="10"
        :totalRecords="120"
        :rowsPerPageOptions="[10, 20, 30]"
        @page="onPage($event)"
      ></Paginator>

      <Dialog
        v-if="selectedItem"
        v-model:visible="preview"
        maximizable
        modal
        :header="selectedItem?.name"
        :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      >
        <Card style="overflow: hidden">
          <template #header>
            <div class="position-relative">
              <img
                alt="user header"
                class="img-fluid rounded-start h-100 w-100 object-fit-cover"
                :src="selectedItem?.imageUrl"
              />
              <div class="position-absolute" style="bottom: 20px; left: 20px">
                <Tag :value="selectedItem.type" />
              </div>
            </div>
          </template>
          <template #title>
            <div class="d-flex justify-content-between">
              <h3>{{ formatCurrency(selectedItem?.price) }}</h3>
              <div class="d-flex align-items-center">
                <Rating
                  :model-value="Number(selectedItem.rating)"
                  :cancel="false"
                />
                <p class="ms-2 mb-0"> ( {{ selectedItem.rating }} )</p>
              </div>
            </div>
          </template>

          <template #subtitle> </template>
          <template #content>
            <div class="d-flex align-items-center">
              <Tag :key="tag" severity="secondary" :value="tag"></Tag>
            </div>
            <Tag></Tag>
            <Divider></Divider>
            <div style="height: 40px">&nbsp;</div>
            <Carousel
              :value="selectedItem?.reviews"
              :numVisible="1"
              :numScroll="1"
              :responsiveOptions="responsiveOptions"
              :showIndicators="false"
            >
              <template #item="slotProps">
                <div
                  class="d-flex flex-column align-items-center justify-content-center"
                >
                </div>
                <div class="d-flex flex-column align-items-center">
                  <Avatar
                    v-if="slotProps.data.headImage"
                    :image="slotProps.data.headImage"
                    class="mr-2"
                    size="xlarge"
                    shape="circle"
                  />
                  <Avatar
                    v-else
                    :label="slotProps.data.username.charAt(0)"
                    class="mr-2"
                    size="xlarge"
                  />
                  <br />
                  <h4>{{ slotProps.data.username }}</h4>
                  <p>{{ slotProps.data.comment }}</p>
                  <!-- <Button
                    v-if="slotProps.data.comment.length > 300"
                    type="button"
                    label="..."
                    @click="readMore = !readMore"
                  /> -->
                </div>
              </template>
            </Carousel>
          </template>
          <!-- <template #footer>
            <div class="flex gap-3 mt-1">
              <Button
                label="Cancel"
                severity="secondary"
                outlined
                class="w-full"
              />
              <Button label="Save" class="w-full" />
            </div>
          </template> -->
        </Card>
      </Dialog>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  IDestination,
  IReview,
} from "@/models/interface/destination.interface";
import { useSearchStore } from "@/stores/search.store";
import { formatCurrency } from "@/utils/helper";
import Avatar from "primevue/avatar";
import Button from "primevue/button";
import Card from "primevue/card";
import Carousel from "primevue/carousel";
import Dialog from "primevue/dialog";
import Divider from "primevue/divider";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import Paginator from "primevue/paginator";
import ProgressSpinner from "primevue/progressspinner";
import Rating from "primevue/rating";
import Tag from "primevue/tag";
import { onMounted, ref } from "vue";

const preview = ref(false);
const searchResults = ref<IDestination[]>([]);
const searchStore = useSearchStore();
const selectedItem = ref();
const isLoading = ref(true);
const paginator = ref({
  page: 1,
  first: 0,
  rows: 10,
  pageCount: 0,
});
const searchForm = ref({
  name: "",
  type: "all",
});
const typeOptions = [
  { name: "All", value: "all" },
  { name: "Restaurant", value: "restaurant" },
  { name: "Shop", value: "shop" },
];
onMounted(async () => {
  await fetchData();
});

const onPage = async (event: any) => {
  await fetchData({ page: event.page + 1, limit: event.rows });
};

const fetchData = async (query?: any) => {
  isLoading.value = true;
  searchResults.value = await searchStore
    .findDestination({
      page: 1,
      limit: 10,
      ...query,
    })
    .then(
      (res) => {
        paginator.value.pageCount = res.data.totalRecord;
        isLoading.value = false;
        return res.data;
      },
      () => {
        isLoading.value = false;
      }
    );
};
const onSearch = async () => {
  if (searchForm.value && Object.keys(searchForm.value)?.length) {
    const submit: any = {};
    submit["name"] = searchForm.value.name;
    submit["type"] = searchForm.value.type["value"];
    await fetchData(submit);
  }
};
const onCardClick = (item: IReview) => {
  preview.value = true;
  selectedItem.value = item;
};

const responsiveOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);
</script>

<style scoped>
:deep(a) {
  text-decoration: none;
  color: inherit;
}

:deep(.p-tabview-nav) {
  justify-content: center;
}

.thumbnail-img {
  border-radius: 12px;
  overflow: hidden;
}

.thumbnail-img:hover img {
  transition: all 0.3s ease-in-out;
  transform: rotate(10deg);
  scale: 1.2;
}
</style>
