-- Trigger: tg_totalhorasActividades

-- DROP TRIGGER "tg_totalhorasActividades" ON public.cierre_actividades;

CREATE TRIGGER "tg_totalhorasActividades"
    AFTER INSERT OR UPDATE OF tiempo
    ON public.control_actividades
    FOR EACH ROW
    EXECUTE PROCEDURE public.ftg_totalhorasactividades();