-- Trigger: tg_SalarioBasico

-- DROP TRIGGER "tg_SalarioBasico" ON public.proyectista;

CREATE TRIGGER "tg_SalarioBasico"
    BEFORE INSERT OR UPDATE 
    ON public.proyectista
    FOR EACH ROW
    EXECUTE PROCEDURE public.ftg_salariobasico();

COMMENT ON TRIGGER "tg_SalarioBasico" ON public.proyectista
    IS 'este es el trigger que ejecuta la funcion del calculo del salario basico al insertar un new proyectista';