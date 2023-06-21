<template>
  <h2>Members</h2>
  <div>member name {{ dataMembers?.user1?.name }}</div>
  <form @submit.prevent="handleAdd">
    <input v-model="userName" required />
    <button>Add</button>
  </form>
  <br />
  <button @click="handleUpdate">Update</button>
  <button @click="handleDelete">Delete</button>
  <pre>{{ dataMembers }}</pre>
  <hr />
  <h2>Filter Data</h2>
  <form @submit.prevent="handleLike">
    <input v-model="idLike" required />
    <button>Like</button>
    <button type="button" @click="handleLikeTransaction">
      Like Transaction
    </button>
  </form>
  <!-- {{ dataQuery[0].id }} -->
  <pre>{{ dataQuery }}</pre>
</template>

<script setup lang="ts">
import {
  useDatabase,
  useDatabaseObject,
  useDatabaseList,
  databaseDefaultSerializer,
  VueDatabaseDocumentData,
} from "vuefire";
import {
  ref as databaseRef,
  endAt,
  equalTo,
  increment,
  orderByChild,
  query,
  remove,
  runTransaction,
  set,
  startAt,
  update,
} from "firebase/database";
import { v4 as uuid } from "uuid";

interface User {
  name: string;
}

interface UserDocument {
  [key: string]: User;
}
const userName = ref("");
const idLike = ref("");
const db = useDatabase();
const members = databaseRef(db, "members");
// const membersId = databaseRef(db, "members/user1");

const { data: dataMembers } = useDatabaseObject<UserDocument>(members);

const mostViewedPosts = query(
  databaseRef(db, "posts"),
  orderByChild("author")
  //   equalTo('Irsyaad')

  //   startAt(1200000),
  //   endAt(12000000)
);
const dataQuery = useDatabaseList(mostViewedPosts);
// const filterData = get(mostViewedPosts);

console.log({ dataQuery });

function handleAdd() {
  if (!userName.value) return;
  const id = uuid();
  set(databaseRef(db, `members/${id}`), {
    name: userName.value,
  }).then(() => (userName.value = ""));
}

function handleUpdate() {
  const id = "420fc6cd-e917-44fb-8951-24f937f04d5a";
  update(databaseRef(db, `members/${id}`), {
    name: "Tomi",
    alamat: "Dirumah",
    rule: "",
    rules: "",
  });
}

function handleDelete() {
  const id = "420fc6cd-e917-44fb-8951-24f937f04d5a";
  remove(databaseRef(db, `members/${id}`))
    .then(() => {
      console.log("sda");
    })
    .catch((err) => console.log(err));
}

function handleLike() {
  if (!idLike.value) return;
  update(databaseRef(db, `posts/${idLike.value}/metrics`), {
    likes: increment(1),
  });
}

function handleLikeTransaction() {
  if (!idLike.value) return;

  runTransaction(
    databaseRef(db, "posts/" + idLike.value + "/metrics"),
    (metrics) => {
      if (metrics) {
        metrics.likes++;
      }
      return metrics;
    }
  );
}
</script>

<style scoped></style>
