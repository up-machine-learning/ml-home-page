<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col-12 col-md-2"></div>
      <div class="col-12 col-md-8">
        <div class="background-filter p-2 p-md-5">
          <h1
            class="text-center mb-4 text-uppercase"
            style="letter-spacing: 6px"
            >Find your destination</h1
          >

          <div class="d-flex mb-3">
            <div class="form-group w-100">
              <label for="">From:</label>
              <InputText class="w-100" disabled placeholder="Siem Reap" />
            </div>
            <div class="m-2 mt-auto"
              ><i class="pi pi-arrow-right-arrow-left"></i
            ></div>
            <div class="form-group w-100">
              <label for="">To:</label>
              <InputText class="w-100" disabled placeholder="Siem Reap" />
            </div>
          </div>
          <div class="col-12 mb-3">
            <div class="form-group w-100">
              <label for="">Date:</label>
              <Calendar
                v-model="searchForm.dateRange"
                selectionMode="range"
                class="w-100"
                :manualInput="false"
              />
            </div>
          </div>
          <div class="d-flex mb-3" @click="visible = true">
            <div class="form-group w-100">
              <label for="">Latitude:</label>
              <InputText class="w-100" v-model="searchForm.latitude" />
            </div>
            <div class="m-2">&nbsp;</div>
            <div class="form-group w-100">
              <label for="">Longitude:</label>
              <InputText class="w-100" v-model="searchForm.longitude" />
            </div>
          </div>
          <div class="col-12 mb-4">
            <div class="form-group w-100">
              <label for="">Preference:</label>

              <MultiSelect
                v-model="searchForm.preference"
                :options="preferOption"
                optionLabel="name"
                placeholder="Select preference"
                :maxSelectedLabels="3"
                style="width: 100%"
              />
            </div>
          </div>
          <div>
            <Dialog
              v-model:visible="visible"
              maximizable
              modal
              header="Choose Location"
              dismissableMask
              @maximize="isFullScreen = true"
              @unmaximize="isFullScreen = false"
              :style="{ width: '50rem' }"
              :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
            >
              <div
                style="width: 100%"
                :style="{ height: isFullScreen ? '100%' : '500px' }"
              >
                <l-map
                  ref="map"
                  v-model:zoom="zoom"
                  :use-global-leaflet="false"
                  :center="[13.36179, 103.86056]"
                >
                  <l-tile-layer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    layer-type="base"
                    name="OpenStreetMap"
                  ></l-tile-layer>
                  <l-marker
                    draggable
                    :lat-lng="[searchForm.latitude, searchForm.longitude]"
                    @update:latLng="locationUpdated"
                  ></l-marker>
                </l-map>
              </div>
              <div class="d-flex justify-content-end gap-2 mt-4">
                <Button
                  type="button"
                  label="Cancel"
                  severity="secondary"
                  class="rounded"
                  @click="visible = false"
                ></Button>
                <Button
                  type="button"
                  label="Save"
                  class="rounded"
                  @click="onConfirmLocation"
                ></Button>
              </div>
            </Dialog>
          </div>

          <div class="w-100 text-center">
            <Button
              label="Search"
              type="button"
              class="rounded w-50"
              @click="onSearch"
            ></Button>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-2"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { https } from "@/utils/axios.helpter";
import { LMap, LMarker, LTileLayer } from "@vue-leaflet/vue-leaflet";
import dayjs from "dayjs";
import "leaflet/dist/leaflet.css";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import MultiSelect from "primevue/multiselect";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const zoom = 13;
const map = ref(null);
const visible = ref(false);
const isFullScreen = ref(false);
const tempLocator = reactive({
  latitude: "",
  longitude: "",
});

const locationUpdated = (latlng: any) => {
  tempLocator.latitude = latlng.lat;
  tempLocator.longitude = latlng.lng;
};

const onConfirmLocation = () => {
  searchForm.latitude = tempLocator.latitude;
  searchForm.longitude = tempLocator.longitude;
  visible.value = false;
};

const searchForm = reactive({
  dateRange: [],
  latitude: "13.3613",
  longitude: "103.8578",
  preference: [] as any,
});

const preferOption = ref([]);

onMounted(async () => {
  preferOption.value = await https
    .get("api/trip/preferences")
    .then((res: any) => {
      return res.data.map((item: any) => {
        return { name: item, value: item };
      });
    });
});

const onSearch = async () => {
  router.push({
    name: "SearchResult",
    query: {
      fromDestination: "Siem Reap",
      toDestination: "Siem Reap",
      fromDate: dayjs(searchForm.dateRange[0]).format("YYYY-MM-DD"),
      toDate: dayjs(searchForm.dateRange[1]).format("YYYY-MM-DD"),
      latitude: searchForm.latitude,
      longitude: searchForm.longitude,
      preferences: searchForm.preference.map((i: any) => i.value),
    },
  });
};
</script>

<style scoped>
.background-filter {
  background-color: rgba(220, 220, 220, 0.2);
  width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
  border-radius: 12px;
}
</style>
