-- FUNCTION: public.ftg_totalhorasactividades()

-- DROP FUNCTION public.ftg_totalhorasactividades();

CREATE FUNCTION public.ftg_prodAcumulada()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
declare tmp numeric(10,2) :=0;
BEGIN
SELECT  produccion_acumulada into tmp FROM public.cierre where id=(SELECT  max(id) FROM public.cierre);
new.produccion_acumulada:= tmp + new.produccion_bruta;
END
$BODY$;

ALTER FUNCTION public.ftg_prodAcumulada()
    OWNER TO postgres;
