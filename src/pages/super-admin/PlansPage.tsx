import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Check, Edit2, Plus, Trash2 } from 'lucide-react';
import { mockPlans, Plan } from '../../utils/mockData';
import { toast } from 'sonner';

export function PlansPage() {
    const [plans, setPlans] = useState<Plan[]>(mockPlans);
    const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

    const handleSave = (plan: Plan) => {
        setPlans(plans.map(p => p.id === plan.id ? plan : p));
        setEditingPlan(null);
        toast.success('Plan actualizado correctamente');
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                    <h1 className="text-primary mb-2">Planes y Límites</h1>
                    <p className="text-muted-foreground">
                        Gestiona los niveles de suscripción y límites para los tenants
                    </p>
                </div>
                <Button className="bg-agro-green-600 hover:bg-agro-green-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Plan
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <Card key={plan.id} className="p-6 shadow-lg border border-border flex flex-col relative overflow-hidden">
                        {plan.id === 'pro' && (
                            <div className="absolute top-0 right-0 bg-agro-green-500 text-white text-xs px-3 py-1 rounded-bl-lg font-medium">
                                POPULAR
                            </div>
                        )}
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-primary mb-2">{plan.name}</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold">${plan.price}</span>
                                <span className="text-muted-foreground">/mes</span>
                            </div>
                        </div>

                        <div className="space-y-4 flex-1">
                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Límites</h4>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center justify-between">
                                        <span>Usuarios</span>
                                        <Badge variant="secondary">{plan.limits.users}</Badge>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span>Animales</span>
                                        <Badge variant="secondary">{plan.limits.animals}</Badge>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span>Almacenamiento</span>
                                        <Badge variant="secondary">{plan.limits.storage}</Badge>
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Características</h4>
                                <ul className="space-y-2 text-sm">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-agro-green-600" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-border flex gap-3">
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => setEditingPlan(plan)}
                            >
                                <Edit2 className="h-4 w-4 mr-2" />
                                Editar
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Edit Modal (Simulated inline for now or could be a Dialog) */}
            {editingPlan && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-lg p-6 bg-background shadow-xl">
                        <h3 className="text-lg font-semibold mb-4">Editar Plan: {editingPlan.name}</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Precio Mensual ($)</Label>
                                    <Input
                                        type="number"
                                        value={editingPlan.price}
                                        onChange={(e) => setEditingPlan({ ...editingPlan, price: Number(e.target.value) })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Límite Usuarios</Label>
                                    <Input
                                        type="number"
                                        value={editingPlan.limits.users}
                                        onChange={(e) => setEditingPlan({
                                            ...editingPlan,
                                            limits: { ...editingPlan.limits, users: Number(e.target.value) }
                                        })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Límite Animales</Label>
                                <Input
                                    type="number"
                                    value={editingPlan.limits.animals}
                                    onChange={(e) => setEditingPlan({
                                        ...editingPlan,
                                        limits: { ...editingPlan.limits, animals: Number(e.target.value) }
                                    })}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <Button variant="ghost" onClick={() => setEditingPlan(null)}>Cancelar</Button>
                            <Button onClick={() => handleSave(editingPlan)}>Guardar Cambios</Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
