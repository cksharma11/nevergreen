(ns nevergreen.api.export
  (:require [nevergreen.github-gateway :as github]
            [nevergreen.gitlab-gateway :as gitlab]
            [clojure.string :refer [blank?]]))

(defn ^:dynamic create-gist [data]
  (github/create-gist data))

(defn ^:dynamic update-gist [data]
  (github/update-gist data))

(defn ^:dynamic create-snippet [data]
  (gitlab/create-snippet data))

(defn ^:dynamic update-snippet [data]
  (gitlab/update-snippet data))

(defn- to-hosted [{:keys [id] :as data} do-create do-update]
  (let [res (if (blank? id)
              (do-create data)
              (do-update data))]
    {:id (:id res)}))

(defn- to-github [data]
  (to-hosted data create-gist update-gist))

(defn- to-gitlab [data]
  (to-hosted data create-snippet update-snippet))

(defn export-config [{:keys [where] :as data}]
  (case where
    "github" (to-github data)
    "gitlab" (to-gitlab data)
    (throw (ex-info (str "exporting to \"" where "\" is not supported") {:status 400}))))
