-- FUNCTION: public.ftg_salariobasico()

-- DROP FUNCTION public.ftg_salariobasico();

CREATE FUNCTION public.ftg_salariobasico()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
begin
	NEW.salario_basico = NEW.escala_salarial + NEW.perfec_empresarial;
	RETURN NEW;
end;
$BODY$;

ALTER FUNCTION public.ftg_salariobasico()
    OWNER TO postgres;
