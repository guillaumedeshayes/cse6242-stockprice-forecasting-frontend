<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <div class="q-ma-md">
          <div class="text-subtitle1 text-bold">
            Stock Close Price Prediction - Dashboard
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="200"
      :breakpoint="400"
    >
      <q-scroll-area
        style="
          height: calc(100% - 60px);
          margin-top: 60px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item
            clickable
            v-ripple
            to="/"
            exact
            @click="layoutTitle = 'Dashboard'"
          >
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section> Dashboard </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="help" />
            </q-item-section>

            <q-item-section> Help </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <div
        class="absolute-top row q-pl-sm justify-evenly items-center"
        style="height: 60px; backgroundcolor: #f2eee8"
      >
        <q-avatar size="40px" class="q-mr-sm">
          <img
            src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          />
        </q-avatar>
        <div class="column itens-left justify-evenly">
          <q-item-label>CSE-6242</q-item-label>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import { date } from "quasar";

export default {
  name: "MainLayout",
  data() {
    return {
      leftDrawerOpen: false,
      miniState: true,
      layoutTitle: "Dashboard",
      editionOpened: false,
      colors: null,
      isGlobalFunctionExecuted: false,
    };
  },
  computed: {
    todaysDate() {
      const timeStamp = Date.now();
      return date.formatDate(timeStamp, "dddd D MMMM");
    },
  },
};
</script>
