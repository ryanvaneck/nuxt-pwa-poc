<template>
  <PageLayout>
    <div class="home">
      <div class="hero">
        <img class="hero-image" src="~/assets/img/room.png" alt="nice room"/>
        <div class="search-box">
          <h1>Find Your reservation</h1>
          <h3>You can search by providing the city or the confirmation code of your reservation.</h3>
          <input
              class="search-input"
              type="text"
              v-model="searchTerm"
              id="searchTermId"
          />
          <label for="searchTermId"></label>
          <div class="search-results" :class="filteredReservations.length ? 'visible' : ''">
            <div
                v-for="reservation in filteredReservations"
                :key="reservation.confirmationCode"
                class="reservation"
            >
              <NuxtLink :to="`/${reservation.confirmationCode}`">
                <div class="city">{{ reservation.city }}</div>
                <div class="dates">
                  {{ formatDates(reservation.checkInDate, reservation.checkOutDate) }},
                  <span> #{{ reservation.confirmationCode }}</span>
                </div>
              </NuxtLink>
            </div>
          </div>
          <input type="button" @click="handleClickSearch" value="Search" class="search-button"/>
          <div>{{ this.searchMessage }}</div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

<script>

import config from '../config/config';
import { formatDateRange } from '@/helpers/dates';
import PageLayout from '@/components/PageLayout';

export default {
  name: 'Home',
  components: { PageLayout },
  mounted() {
    // ensure / is cached even on the first visit
    this.$http.get('/');
  },
  computed: {
    filteredReservations: function () {
      return this.reservations
          .filter((res) => {
            const searchTerm = this.searchTerm.toLowerCase();
            return this.searchTerm &&
                (res.city.toLowerCase().includes(searchTerm) || res.confirmationCode.toLowerCase().includes(searchTerm));
          });
    }
  },
  watch: {
    searchTerm() {
      this.searchMessage = '';
    }
  },
  methods: {
    formatDates(checkIn, checkOut) {
      const { startDate, endDate } = formatDateRange(checkIn, checkOut);
      return `${startDate} - ${endDate}`;
    },
    handleClickSearch() {
      if (this.filteredReservations.length === 1) {
        this.$router.push(`/${this.filteredReservations[0].confirmationCode}`);
      } else {
        this.searchMessage = `${this.filteredReservations.length} results found. Click one to continue.`;
      }
    }
  },
  data() {
    return {
      reservations: [],
      searchTerm: '',
      searchMessage: '',
    };
  },
  async asyncData({ $http }) {
    try {
      const reservations = await $http.$get(`${config.api.host}/reservations`);
      return { reservations };
    } catch (e) {
      return { error: 'No internet connection detected' };
    }
  }
};

</script>

<style>
@font-face {
  font-family: "Lora";
  src: url("https://fonts.gstatic.com/s/lora/v16/0QIvMX1D_JOuMwr7I_FMl_E.woff2") format("woff");
}

body {
  font-family: Lora, serif;
  margin: 0;
}

.search-results.visible {
  border: solid 1px grey;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 5px;
}

.reservation {
  padding: .7em;
  font-size: 14px;
}

.reservation > a {
  text-decoration: none;
  color: #fff;
}

.reservation:hover {
  background: #f2f2f2;
}

.city {
  color: #2d2d2d;
}

.dates {
  color: #919191;
}

.hero {
  position: relative;
  width: 100%
}

.hero-image {
  width: 100%;
}

.search-box {
  background: #FAFAFA;
  padding: 1.2rem;
  width: 90%
}

.search-input {
  width: 98%;
  height: 2.2em;
  margin: 1em 0;
}

.search-button {
  width: 100%;
  background: #2f2b8d;
  color: #fff;
  padding: 1em;
  border: none;
  border-radius: 5px;
}

@media screen and (min-width: 768px) {
  .search-box {
    position: absolute;
    top: 30px;
    left: 20px;
    width: 450px;
  }

  .hero {
    float: right;
    max-width: 1000px;
  }

}

@media screen and (min-width: 1024px) {

  .home {
    padding: 80px;
  }

  .search-box {
    left: -100px;
  }
}

@media screen and (min-width: 1300px) {
  .search-box {
    left: -260px;
  }
}
</style>
