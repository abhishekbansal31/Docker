from core.models import XYZ
from server.settings import MONGO_DB_NAME_DJANGO


class DatabaseRouter:
    """
    A router to control if database should use
    primary database or non-relational/other one.
    """
    mongo_apps = {XYZ._meta.app_label}
    mongo_models = {XYZ._meta.model_name}

    def db_for_read(self, model, **_hints):
        print("---------------read---------------")
        print(_hints)
        if model._meta.app_label in self.mongo_apps and model._meta.model_name in self.mongo_models:
            print("read from mongo")
            return MONGO_DB_NAME_DJANGO
        return None

    def db_for_write(self, model, **_hints):
        print("---------------write---------------")
        print(_hints)
        if model._meta.app_label in self.mongo_apps and model._meta.model_name in self.mongo_models:
            print("write to mongo")
            return MONGO_DB_NAME_DJANGO
        return None

    def allow_migrate(self, _db, app_label, model_name=None, **_hints):
        print("---------------migrate---------------")
        print(_hints)
        if _db == MONGO_DB_NAME_DJANGO:
            if app_label in self.mongo_apps and model_name in self.mongo_models:
                print("migrate to mongo")
                return True
            return False
        elif app_label in self.mongo_apps and model_name in self.mongo_models:
            print("don't apply this migration to "+_db)
            return False
        return None
        # if _db == MONGO_DB_NAME_DJANGO or model_name in self.mongo_models:
        #     return False
        # return True