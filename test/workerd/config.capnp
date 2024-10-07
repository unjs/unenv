using Workerd = import "../../node_modules/workerd/workerd.capnp";

const unitTests :Workerd.Config = (
  services = [
    (name = "tests", worker = .testsWorker),
  ],
);

const testsWorker :Workerd.Worker = (
  modules = [
    (name = "tests", esModule = embed "./tests.mjs")
  ],
  compatibilityDate = "2024-10-04",
  compatibilityFlags = ["nodejs_compat"],
  moduleFallback = "localhost:8888",
);
