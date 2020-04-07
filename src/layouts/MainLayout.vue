<template>
  <q-layout view="lHh Lpr fff" class="bg-grey-1">
    <q-header elevated class="bg-primary" height-hint="64">
      <q-bar class="q-electron-drag">
        <div>BMC Guide</div>
        <q-space/>

        <q-btn dense flat icon="minimize" @click="minimize" />
        <q-btn dense flat icon="crop_square" @click="maximize" />
        <q-btn dense flat icon="close" @click="closeApp" />
      </q-bar>
      <q-toolbar class="GPL__toolbar" style="height: 64px">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
          class="q-mx-md"
        />

        <q-toolbar-title v-if="$q.screen.gt.sm" shrink class="row items-center no-wrap">
          <span>BMC Guide</span>
        </q-toolbar-title>

        <q-space/>

        <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
          <q-btn dense flat no-wrap>
            <q-avatar rounded size="20px">
              <img src="https://cdn.quasar.dev/img/avatar3.jpg">
            </q-avatar>
            <q-icon name="arrow_drop_down" size="16px"/>

            <q-menu auto-close>
              <q-list dense>
                <q-item class="GL__menu-link-signed-in">
                  <q-item-section>
                    <div><strong>{{activeUserInfo.displayName}}</strong></div>
                  </q-item-section>
                </q-item>
                <q-separator/>
                <q-item clickable class="GL__menu-link" @click="$refs.Settings.show()">
                  <q-item-section>Settings</q-item-section>
                </q-item>
                <q-item clickable @click="logout" class="GL__menu-link">
                  <q-item-section>Sign out</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      behavior="mobile"
      @click="leftDrawerOpen = false"
    >
      <q-scroll-area class="fit">
        <q-toolbar class="GPL__toolbar">
          <q-toolbar-title class="row items-center text-grey-8">
            <span class="q-ml-sm text-primary">BMC Guide</span>
          </q-toolbar-title>
        </q-toolbar>

        <q-list padding>
          <q-item v-for="link in navigations" :key="link.text" exact :to="link.to" clickable class="GPL__drawer-item">
            <q-item-section avatar>
              <q-icon :name="link.icon"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="GPL__page-container">
      <router-view/>
      <q-page-sticky v-if="$q.screen.gt.sm" expand position="left" class="bg-white">
        <div class="fit q-pt-md q-px-sm column">
          <q-btn round flat color="primary" stack no-caps size="26px" class="GPL__side-btn" to="/">
            <q-icon size="22px" name="home"/>
            <div class="GPL__side-btn__label">Home</div>
          </q-btn>
          <q-btn round flat color="orange" stack no-caps size="26px" class="GPL__side-btn" to="/travel">
            <q-icon size="22px" name="send"/>
            <div class="GPL__side-btn__label">Travel</div>
          </q-btn>
          <q-btn round flat color="positive" stack no-caps size="26px" class="GPL__side-btn" to="/restaurant">
            <q-icon size="22px" name="restaurant"/>
            <div class="GPL__side-btn__label">Restaurant</div>
          </q-btn>
        </div>
      </q-page-sticky>
    </q-page-container>
    <Settings ref="Settings"/>
  </q-layout>
</template>

<script>
    import EssentialLink from 'components/EssentialLink'
    import {LocalStorage} from "quasar";
    import Settings from "pages/settings/Settings";

    export default {
        name: 'MainLayout',

        components: {
            Settings,
            EssentialLink
        },

        data() {
            return {
                leftDrawerOpen: false,
                search: '',
                storage: 0.26,
                navigations: [
                    {icon: 'home', text: 'Home', to: '/'},
                    {icon: 'send', text: 'Travel', to: '/travel'},
                    {icon: 'restaurant', text: 'Restaurant', to: '/restaurant'},
                ]
            }
        },
        computed: {
            activeUserInfo() {
                return this.$store.state.auth.AppActiveUser
            }
        },
        async created() {
            let self = this;
            const token = LocalStorage.getItem("userInfo");
            if (token) {
                await self.$store.dispatch('auth/updateUserData', token);
            }
        },
        methods: {
            logout() {
                LocalStorage.remove('userInfo');
                this.$router.push('/login')
            },
            minimize() {
                if (process.env.MODE === 'electron') {
                    this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize()
                }
            },

            maximize() {
                if (process.env.MODE === 'electron') {
                    const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow()

                    if (win.isMaximized()) {
                        win.unmaximize()
                    } else {
                        win.maximize()
                    }
                }
            },

            closeApp() {
                if (process.env.MODE === 'electron') {
                    this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
                }
            }
        }
    }
</script>
<style lang="sass">
  .GPL
    &__toolbar
      height: 64px

    &__toolbar-input
      width: 35%

    &__drawer-item
      line-height: 24px
      border-radius: 0 24px 24px 0
      margin-right: 12px

      .q-item__section--avatar
        padding-left: 12px

        .q-icon
          color: #5f6368

      .q-item__label:not(.q-item__label--caption)
        color: #3c4043
        letter-spacing: .01785714em
        font-size: .875rem
        font-weight: 500
        line-height: 1.25rem

      &--storage
        border-radius: 0
        margin-right: 0
        padding-top: 24px
        padding-bottom: 24px

    &__side-btn
      &__label
        font-size: 12px
        line-height: 24px
        letter-spacing: .01785714em
        font-weight: 500

    @media (min-width: 1024px)
      &__page-container
        padding-left: 94px
</style>
