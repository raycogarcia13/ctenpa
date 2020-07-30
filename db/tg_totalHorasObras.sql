-- Trigger: tg_totalHorasObras

-- DROP TRIGGER "tg_totalHorasObras" ON public.control_obra;

CREATE TRIGGER "tg_totalHorasObras"
    AFTER INSERT OR UPDATE OF tiempo
    ON public.control_obra
    FOR EACH ROW
    EXECUTE PROCEDURE public.ftg_totalhorasobras();