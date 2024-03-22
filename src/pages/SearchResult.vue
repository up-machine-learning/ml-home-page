<template>
  <section id="search-result">
    <div class="container">
      <div class="row my-4">
        <div class="col d-flex align-items-center">
          <span class="p-2 me-2"
            ><Button
              icon="pi pi-chevron-left"
              class="p-button-text p-button-lg p-button-rounded p-button-secondary"
              text
              rounded
              aria-label="Back"
              @click="$router.go(-1)"
          /></span>
          <h2>Search Result</h2>
          <hr />
        </div>
      </div>
      <div
        v-if="!searchResults || Object.keys(searchResults).length === 0"
        class="d-flex justify-content-center"
      >
        <ProgressSpinner />
      </div>
      <div
        class="my-4"
        v-if="searchResults && Object.keys(searchResults).length"
      >
        <div class="card border-0">
          <TabView>
            <TabPanel
              v-for="(value, key, index) of searchResults"
              :key="key + '' + index"
              :header="camelToCapitalize(String(key))"
            >
              <div class="m-0">
                <div class="row">
                  <div
                    class="col-12 col-md-6"
                    v-for="option of value as any"
                    :key="option.id"
                  >
                    <div
                      class="card mb-3 cursor-pointer"
                      @click="onCardClick(option)"
                    >
                      <div class="row g-0">
                        <div
                          class="col-md-5 thumbnail-img"
                          style="height: 240px"
                        >
                          <img
                            :src="option.imageUrl"
                            class="img-fluid rounded-start h-100 w-100 object-fit-cover"
                            alt="..."
                          />
                        </div>
                        <div class="col-md-7">
                          <div class="card-body">
                            <Tag :value="option.type" />
                            <h5 class="card-title">{{ option.name }}</h5>
                            <div class="d-flex align-items-center">
                              <Rating v-model="option.rating" :cancel="false" />
                              <p class="ms-2 mb-0"> ( {{ option.rating }} )</p>
                            </div>
                            <div class="d-flex align-items-center">
                              <i class="pi pi-map-marker"></i>
                              <p class="ms-2 mb-0"
                                >{{ Number(option.distance).toFixed(2) }} Km</p
                              >
                            </div>
                            <small
                              >Review Count: {{ option.reviewCount }}</small
                            >
                            <p>{{ formatCurrency(option.price) }} USD </p>
                            <!-- <p class="card-text line-clamp-3">{{
                              option.description
                            }}</p> -->

                            <Tag
                              v-for="tag of option.tags"
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
            </TabPanel>
          </TabView>
        </div>
      </div>

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
                <div class="position-relative" style="width: fit-content"
                  >Sentiment Result :

                  <Tag
                    v-tooltip.top="{
                      value: slotProps.data.predictedSentiment,
                      pt: {
                        arrow: {
                          style: {
                            borderTopColor: 'white',
                          },
                        },
                        text: {
                          style: {
                            backgroundColor: 'var(--secondary-color)',
                            color: 'var(--primary-color)',
                          },
                        },
                      },
                    }"
                    :value="
                      predictSentiment(slotProps.data.predictedSentiment).value
                    "
                    :severity="
                      predictSentiment(slotProps.data.predictedSentiment)
                        .severity
                    "
                  ></Tag
                ></div>
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
import { IOption, ISuggestion } from "@/models/interface/suggestion.interface";
import { useSearchStore } from "@/stores/search.store";
import { camelToCapitalize, formatCurrency } from "@/utils/helper";
import Avatar from "primevue/avatar";
import Button from "primevue/button";
import Card from "primevue/card";
import Carousel from "primevue/carousel";
import Dialog from "primevue/dialog";
import Divider from "primevue/divider";
import ProgressSpinner from "primevue/progressspinner";
import Rating from "primevue/rating";
import TabPanel from "primevue/tabpanel";
import TabView from "primevue/tabview";
import Tag from "primevue/tag";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const preview = ref(false);
const route = useRoute();
const searchResults = ref<ISuggestion[]>([]);
const searchStore = useSearchStore();
const selectedItem = ref<IOption>();

onMounted(async () => {
  searchResults.value = await searchStore.findAll({
    preferences: [],
    ...route.query,
  });
});

const onCardClick = (item: IOption) => {
  preview.value = true;
  selectedItem.value = item;
};

const predictSentiment = (sentiment: number) => {
  if (sentiment >= 0.5)
    return {
      value: "Positive",
      severity: "success",
    };
  if (sentiment <= -0.5)
    return {
      value: "Negative",
      severity: "danger",
    };
  return {
    value: "Neutral",
    severity: "warning",
  };
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
