<template>
  <div
      id="sidenav-collapse-main"
      class="collapse navbar-collapse w-auto h-auto h-100"
  >
    <ul class="navbar-nav">
      <li class="nav-item" v-for="menu in SidebarItem" :key="menu.id">
        <SidenavCollapse
            collapse-ref="dashboards"
            :nav-text="menu.label"
            :class="getRoute === 'dashboards' ? 'active' : ''"
        >
          <template #icon>
            <span class="bg-success rounded-pill p-1 w-100">
            <img :src="menu.img" alt="icon" width="20"/>
            </span>
          </template>
          <template #list>
            <SidenavCollapseItem
                :is-sub="item.isSub"
                v-for="item in menu.subMenu"
                :to="item.url"
                :mini-icon="item.img"
                :text="item.label"
                :color="item.color"
            >
              <template #nav-child-item>
                <SidenavItem
                    v-for="i in item.subMenu"
                    :to="i.url"
                    :mini-icon="i.img"
                    :text="i.label"
                    :color="i.color"
                    :istarget="i.istarget"
                />
              </template>
            </SidenavCollapseItem>
            <!--            <ul class="nav ms-4">-->
            <!--              <SidenavItem-->
            <!--                  v-for="item in menu.subMenu"-->
            <!--                  :key="item.id"-->
            <!--                  :to="item.url"-->
            <!--                  :mini-icon="item.img"-->
            <!--                  :text="item.label"-->
            <!--                  :color="item.color"-->
            <!--              >-->
            <!--                <SidenavCollapseItem v-if="item.subMenu">-->
            <!--                  <template #nav-child-item>-->
            <!--                    <SidenavItem-->
            <!--                        v-for="i in item.subMenu"-->
            <!--                        :to="i.url"-->
            <!--                        :mini-icon="i.img"-->
            <!--                        :text="i.label"-->
            <!--                        :color="i.color"-->
            <!--                    />-->
            <!--                  </template>-->
            <!--                </SidenavCollapseItem>-->

            <!--              </SidenavItem>-->
            <!--            </ul>-->
          </template>
        </SidenavCollapse>
      </li>
    </ul>
  </div>
</template>
<script setup>
import SidenavCollapse from "../Sidenav/SidenavCollapse.vue";
import SidenavCollapseItem from "../Sidenav/SidenavCollapseItem.vue";
import SidenavItem from "../Sidenav/SidenavItem.vue";
import {useNavStore} from "../../stores/NavStore";

const navStore = useNavStore();
import {useStore} from "../../stores/menu-store";

const router = useRouter();
const store = useStore();
const visible = ref(true);
const SidebarItem = store.sidebarItems[0]

const sidenavType = computed(() => {
  return navStore.sidenavType === "bg-white" ? "text-dark" : "text-white";
});
const getRoute = computed(() => {
  const route = useRoute();
  return route.path.split("/")[1];
});
defineProps({
  isRTL: {
    type: Boolean,
    default: false,
  },
});



</script>


<!--              <SidenavCollapseItem-->
<!--                  v-if="menu.isSub"-->
<!--                  mini-icon="L"-->
<!--                  text="تقسیمات کشوری ">-->
<!--                <template #nav-child-item>-->
<!--                  <SidenavItem-->
<!--                      to="/infrastructure-management/divisions-divisions/add-province"-->
<!--                      mini-icon="L"-->
<!--                      text="اطلاعات استان"-->
<!--                  />-->
<!--                  <SidenavItem-->
<!--                      to="/infrastructure-management/divisions-divisions/add-city"-->
<!--                      mini-icon="L"-->
<!--                      text="اطلاعات شهرستان"-->
<!--                  />-->
<!--                  <SidenavItem-->
<!--                      to="/infrastructure-management/divisions-divisions/add-district"-->
<!--                      mini-icon="L"-->
<!--                      text="اطلاعات بخش"-->
<!--                  />-->
<!--                  <SidenavItem-->
<!--                      to="/infrastructure-management/divisions-divisions/add-village"-->
<!--                      mini-icon="L"-->
<!--                      text="اطلاعات دهستان"-->
<!--                  />-->
<!--                  <SidenavItem-->
<!--                      to="/infrastructure-management/divisions-divisions/add-hamlet"-->
<!--                      mini-icon="L"-->
<!--                      text="اطلاعات آبادی"-->
<!--                  />-->
<!--                </template>-->
<!--              </SidenavCollapseItem>-->
