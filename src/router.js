import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/groen/welkom'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/demoFeatures/Login.vue')
    },
    {
      path: '/groen',
      name: 'groen',
      component: () =>
        import('@/components/rekenenMetGroen/mtRekenenMetGroen.vue'),
      children: [
        {
          path: 'welkom',
          name: 'welkom',
          component: () => import('@/components/algemeen/mtWelkom.vue')
        },
        {
          path: 'gebruiksvoorwaarden',
          name: 'gebruiksvoorwaarden',
          component: () =>
            import('@/components/algemeen/mtGebruiksvoorwaarden.vue')
        },
        {
          path: 'instructies',
          name: 'instructies',
          component: () => import('@/components/algemeen/mtInstructies.vue')
        },
        {
          path: 'rekenenmetgroen',
          name: 'rekenenmetgroen',
          component: () =>
            import('@/components/projectInfo/mtRekenenMetGroen.vue')
        },
        {
          path: 'resultgroendakvoorklant',
          name: 'resultgroendakvoorklant',
          component: () =>
            import('@/components/eindResultaatGroenDak/mtResultaatVoorKlant')
        },
        {
          path: 'resultgroendakvoorgemeenschap',
          name: 'resultgroendakvoorgemeenschap',
          component: () =>
            import(
              '@/components/eindResultaatGroenDak/mtResultaatVoorGemeenschap'
            )
        },
        {
          path: 'resultgroenegevelvoorklant',
          name: 'resultgroenegevelvoorklant',
          component: () =>
            import('@/components/eindResultaatGroeneGevel/mtResultaatVoorKlant')
        },
        {
          path: 'resultgroenegevelvoorgemeenschap',
          name: 'resultgroenegevelvoorgemeenschap',
          component: () =>
            import(
              '@/components/eindResultaatGroeneGevel/mtResultaatVoorGemeenschap'
            )
        },
        {
          path: 'resultOptions',
          name: 'resultOptions',
          component: () =>
            import('@/components/demoFeatures/mtResultImageMap.vue')
        },
        {
          path: 'kengetallen',
          name: 'kengetallen',
          component: () => import('@/components/demoFeatures/mtKengetallen.vue')
        },
        {
          path: 'review',
          name: 'review',
          component: () => import('@/components/reviewInput/review.vue')
        },
        {
          path: 'infosheet',
          name: 'infosheet',
          component: () => import('@/components/zooi/mtInfoSheet.vue')
        },
        {
          path: 'tssresultgroendakvoorklant',
          name: 'tssresultgroendakvoorklant',
          component: () =>
            import('@/components/tussenResultaatGroenDak/mtVoorKlant.vue')
        },
        ,
        {
          path: 'tssresultgroendakvoorgemeenschap',
          name: 'tssresultgroendakvoorgemeenschap',
          component: () =>
            import('@/components/tussenResultaatGroenDak/mtVoorGemeenschap.vue')
        },
        {
          path: 'tssresultgroenegevelvoorklant',
          name: 'tssresultgroenegevelvoorklant',
          component: () =>
            import('@/components/tussenResultaatGroeneGevel/mtVoorKlant.vue')
        },
        ,
        {
          path: 'tssresultgroenegevelvoorgemeenschap',
          name: 'tssresultgroenegevelvoorgemeenschap',
          component: () =>
            import(
              '@/components/tussenResultaatGroeneGevel/mtVoorGemeenschap.vue'
            )
        }
      ]
    }
  ]
});
